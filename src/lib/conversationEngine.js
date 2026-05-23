// Conversational AI Orchestration Engine for RoadLens AI
import { useWorkflowStore } from '../store/useWorkflowStore';
import { analyzeRoadImage } from './geminiService';
import { extractGPSFromImage, reverseGeocode, getAuthorityForLocation } from './locationService';

// Helper to convert a file to a Base64 string
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Handles action card clicks from the initial greetings.
 */
export const handleActionCardSelect = (actionId) => {
  const store = useWorkflowStore.getState();
  store.collapseOldWorkflows();

  let userText = "";
  let aiText = "";
  let actions = null;

  if (actionId === 'report_issue') {
    userText = "Report Issue";
    aiText = "I can help you report an infrastructure issue. Please upload a clear image of the road surface or pavement damage to get started.";
    store.setUploadBarVisible(true);
  } else if (actionId === 'capture_image') {
    userText = "Capture Image";
    aiText = "Camera access is simulated. Please select or upload a road surface image from your device for direct damage analysis.";
    store.setUploadBarVisible(true);
  } else if (actionId === 'recent_reports') {
    userText = "View Recent Reports";
    aiText = "Retrieving recent reports near Coimbatore North:\n\n• INC-7822: Pothole Cluster on Trichy Rd — High Risk (Pending dispatch)\n• INC-7809: Transverse Cracking on Avinashi Rd — Medium Risk (Resolved)\n• INC-7798: Alligator Cracking on Mettupalayam Rd — High Risk (Dispatched)";
    actions = ['report_issue', 'capture_image'];
  }

  // Add user reply message
  store.addMessage({
    sender: 'user',
    text: userText,
    type: 'text'
  });

  // Delayed AI response for premium pacing
  setTimeout(() => {
    store.addMessage({
      sender: 'ai',
      text: aiText,
      type: 'text',
      actions: actions
    });
  }, 600);
};

/**
 * Orchestrates the full image upload analysis workflow.
 */
export const handleImageUpload = async (file) => {
  const store = useWorkflowStore.getState();

  // 1. Collapse all previous workflows, reports, action buttons to clean up visual clutter
  store.collapseOldWorkflows();
  store.setUploadBarVisible(false); // Hide upload bar once analysis begins

  // 2. Add user message showing we uploaded a file (avoid inline image display)
  store.addMessage({
    sender: 'user',
    text: `Uploaded photo: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
    type: 'text'
  });

  // 3. Setup loading/analysis state in store
  store.setAnalyzing(true);
  store.resetWorkflowSteps();

  // Add the vertical timeline item to the message feed
  const workflowMsgId = Math.random().toString(36).substring(7);
  store.addMessage({
    id: workflowMsgId,
    sender: 'ai',
    type: 'workflow',
    text: 'Analyzing uploaded image...'
  });

  // Step 1: Uploading Image
  store.setActiveWorkflowStep(1);

  try {
    // Start base64 conversion and call the Gemini API in the background
    const base64Data = await fileToBase64(file);
    const mimeType = file.type;

    // Simulate timeline progress while call occurs
    await delay(900);
    
    // Step 2: Surface Analysis
    store.setActiveWorkflowStep(2);
    await delay(900);

    // Step 3: Damage Detection (Wait for actual Gemini API results here)
    store.setActiveWorkflowStep(3);
    
    // Call Gemini API to validate & analyze
    const analysisResult = await analyzeRoadImage(base64Data, mimeType);

    // 4. Validate image content & quality from API response
    if (!analysisResult.isValidRoad || !analysisResult.isQualitySufficient) {
      store.setAnalyzing(false);
      
      // Update/Replace workflow timeline with failure message
      store.updateMessage(workflowMsgId, {
        type: 'text',
        text: analysisResult.errorMessage || "Image validation failed. Please upload a clear image containing a road surface."
      });
      return;
    }

    // Step 4: Metadata Validation
    store.setActiveWorkflowStep(4);
    await delay(800);

    // Step 5: Geolocation Resolution
    store.setActiveWorkflowStep(5);
    
    // Attempt EXIF GPS extraction
    const gpsCoords = await extractGPSFromImage(file);
    let resolvedLocation = null;

    if (gpsCoords) {
      // Narration: GPS found
      store.addMessage({
        sender: 'ai',
        type: 'text',
        text: "Road GPS coordinates detected in image metadata. Resolving infrastructure geolocation..."
      });
      await delay(1000);

      const address = await reverseGeocode(gpsCoords.latitude, gpsCoords.longitude);
      if (address && address.city) {
        resolvedLocation = {
          city: address.city,
          state: address.state,
          district: address.district || address.city,
          road: address.road || 'Main Road',
          authority: getAuthorityForLocation(address),
          roadLocationDetected: true
        };
      }
    }

    if (resolvedLocation) {
      // Narration: location resolved from metadata
      store.setLocationData(resolvedLocation);
      store.addMessage({
        sender: 'ai',
        type: 'text',
        text: `Metadata location resolved successfully: ${resolvedLocation.road}, ${resolvedLocation.city}, ${resolvedLocation.state}.`
      });
      await delay(800);

      // Resume flow with detected location
      await finishWorkflow(analysisResult, resolvedLocation, store, workflowMsgId);

    } else {
      // Fallback Flow: Metadata is missing or geocoding failed
      store.setAnalyzing(false); // Pause active progress to await input
      
      // Narration: location missing
      store.addMessage({
        sender: 'ai',
        type: 'text',
        text: "Road location could not be automatically identified from the uploaded image. Please confirm the infrastructure location."
      });

      // Open Modal and store resume callback
      store.setOnLocationResolvedCallback((manualLocation) => {
        // Close modal
        store.setLocationModalOpen(false);
        store.setAnalyzing(true);

        const mappedLocation = {
          city: manualLocation.city,
          state: manualLocation.state,
          district: manualLocation.district || manualLocation.city,
          road: manualLocation.road || 'Reported Area',
          authority: getAuthorityForLocation(manualLocation),
          roadLocationDetected: false
        };

        store.setLocationData(mappedLocation);

        // Add user response to chat stream
        store.addMessage({
          sender: 'user',
          text: `Confirmed location: ${mappedLocation.road}, ${mappedLocation.city}, ${mappedLocation.state}`,
          type: 'text'
        });

        // Resume remaining steps
        setTimeout(async () => {
          // Step 6: Authority Mapping
          store.setActiveWorkflowStep(6);
          store.addMessage({
            sender: 'ai',
            type: 'text',
            text: `Municipal authority mapping completed. Mapped to ${mappedLocation.authority}.`
          });
          await delay(800);

          // Step 7: Report Generation
          store.setActiveWorkflowStep(7);
          await delay(800);

          // Complete workflow
          await finishWorkflow(analysisResult, mappedLocation, store, workflowMsgId);
        }, 600);
      });

      // Show location modal trigger button or open it directly
      setTimeout(() => {
        store.setLocationModalOpen(true);
      }, 500);
    }

  } catch (error) {
    console.error("Workflow analysis error:", error);
    store.setAnalyzing(false);
    
    // Replace timeline with error message
    store.updateMessage(workflowMsgId, {
      type: 'text',
      text: "AI infrastructure analysis service is temporarily unavailable. Please retry in a few moments."
    });
  }
};

/**
 * Resumes and finishes the last steps of report generation once location is resolved.
 */
async function finishWorkflow(analysisResult, location, store, timelineMsgId) {
  // Step 6: Authority Mapping
  store.setActiveWorkflowStep(6);
  await delay(800);

  // Step 7: Report Generation
  store.setActiveWorkflowStep(7);
  await delay(800);

  // Generate Report Card
  const reportData = {
    id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
    severityScore: analysisResult.severityScore,
    damageType: analysisResult.damageType,
    riskLevel: analysisResult.riskLevel,
    location: `${location.road ? location.road + ', ' : ''}${location.city}, ${location.state}`,
    recommendedAction: analysisResult.recommendedAction,
    authority: location.authority,
    confidenceScore: analysisResult.confidenceScore,
    timestamp: new Date().toISOString()
  };

  store.setAnalyzing(false);
  store.setCurrentReport(reportData);

  // Render report card
  store.addMessage({
    sender: 'ai',
    type: 'report',
    data: reportData
  });

  // Final summary message
  const summaryText = `Road infrastructure analysis completed successfully. Severe pavement deterioration has been identified near ${location.city}. Immediate repair intervention is recommended. The responsible municipal authority has been identified as the ${location.authority} and the report is ready for dispatch.`;
  
  setTimeout(() => {
    store.addMessage({
      sender: 'ai',
      type: 'text',
      text: summaryText
    });

    // Action buttons
    setTimeout(() => {
      store.addMessage({
        sender: 'ai',
        type: 'actions',
        actionType: 'report_complete'
      });
    }, 600);
  }, 600);
}

// Utility function to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
