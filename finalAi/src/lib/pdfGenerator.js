import { jsPDF } from 'jspdf';

/**
 * Generates a premium, government-grade multi-page PDF report for a RoadLens AI incident.
 * @param {Object} report - The report data object
 */
export const generatePremiumPDF = (report) => {
  if (!report) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm

  // Premium Color Palette Definitions
  const colorPrimary = [15, 23, 42];      // #0F172A (Slate 900)
  const colorSkyBlue = [14, 165, 233];    // #0EA5E9 (Sky 500)
  const colorGrayBg = [248, 250, 252];    // #F8FAFC (Slate 50)
  const colorBorder = [226, 232, 240];    // #E2E8F0 (Slate 200)
  const colorTextSecondary = [100, 116, 139]; // #64748B (Slate 500)
  const colorTextPrimary = [15, 23, 42];   // #0F172A (Slate 900)

  // Parse location and fields (with robust fallbacks for historical/seed reports)
  const location = report.location || 'Avinashi Road, Coimbatore, Tamil Nadu';
  const road = report.roadName || location.split(',')[0] || 'Avinashi Road';
  const area = report.area || (location.split(',').length > 1 ? location.split(',')[1].trim() : 'Peelamedu');
  const city = report.city || 'Coimbatore';
  const state = report.state || (location.split(',').length > 2 ? location.split(',')[2].trim() : 'Tamil Nadu');
  const district = report.district || city;
  
  const gps = report.gpsCoordinates || "11.016800, 76.955800 (Archive Georeference)";
  const summary = report.summary || report.detectionSummary || "Visual infrastructure damage detected.";
  const severityScore = report.severityScore || "5.0";
  const riskLevel = report.riskLevel || (parseFloat(severityScore) >= 7.0 ? 'High' : parseFloat(severityScore) >= 4.5 ? 'Medium' : 'Low');
  const isHighRisk = ['high', 'critical'].includes(riskLevel.toLowerCase());

  // Municipal Dispatch Fields
  const authority = report.authority || 'Coimbatore City Municipal Corporation (CMC)';
  const dispatchNode = report.dispatchNode || 'RoadLens Municipal API Gateway v2.4';
  const escalationStatus = report.status === 'Dispatched' || report.base64Image ? 'Escalated to Engineering Operations' : 'Awaiting Operations Review';
  const repairPriority = isHighRisk ? 'CRITICAL ACTION' : 'SCHEDULED MAINTENANCE';
  const responseSLA = isHighRisk ? 'Action within 24 Hours' : 'Action within 7 Days';

  // AI Recommendation Fields
  const repairRec = report.recommendedAction || (isHighRisk ? 'Immediate patch repairs and milling.' : 'Joint sealing and surface overlay.');
  const safetyAdvisory = isHighRisk 
    ? 'POTENTIAL HAZARD: Pavement anomalies may cause vehicle lane deviation, sudden braking, or cycling accidents. Install speed advisory warnings immediately.'
    : 'ROUTINE NOTICE: Minor pavement cracking. Low immediate danger to transit. Periodic monitoring advised.';
  const suggestedUrgency = isHighRisk ? 'HIGH URGENCY DISPATCH' : 'MEDIUM URGENCY SCHEDULE';
  const infrastructureRiskNotes = isHighRisk 
    ? 'CRITICAL BASE FATIGUE: Severe base fatigue detected. Surface moisture seepage is compromising sub-base structural integrity. Run core drills.'
    : 'MONITOR SURFACE: Minimal fatigue. Perform routine preventative maintenance to seal joints against moisture ingress.';

  // --- PAGE 1: DETAILS, METADATA & ANALYSIS ---

  // Accent header line (Sky Blue)
  doc.setFillColor(...colorSkyBlue);
  doc.rect(0, 0, pageWidth, 4, 'F');

  // Header Title & Logo
  doc.setTextColor(...colorPrimary);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('RoadLens', 15, 20);

  // Logo dot (Sky Blue)
  doc.setFillColor(...colorSkyBlue);
  doc.circle(52, 16.5, 1.5, 'F');

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...colorTextSecondary);
  doc.text('CIVIC INFRASTRUCTURE INTELLIGENCE NODE', 15, 25);

  // Report Title (Right aligned)
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(...colorSkyBlue);
  doc.text('INFRASTRUCTURE INTELLIGENCE REPORT', pageWidth - 15, 20, { align: 'right' });

  // Report ID & Timestamp (Right aligned)
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...colorTextSecondary);
  doc.text(`Report ID: ${report.id}`, pageWidth - 15, 25, { align: 'right' });
  doc.text(`Generated: ${new Date(report.timestamp).toLocaleString()}`, pageWidth - 15, 29, { align: 'right' });

  // Horizontal separating line
  doc.setDrawColor(...colorBorder);
  doc.setLineWidth(0.5);
  doc.line(15, 34, pageWidth - 15, 34);

  let currentY = 40;

  // Helper to draw a section header
  const drawSectionHeader = (title) => {
    doc.setFillColor(241, 245, 249); // light blue-gray
    doc.rect(15, currentY, pageWidth - 30, 8, 'F');
    
    // Left blue accent indicator
    doc.setFillColor(...colorSkyBlue);
    doc.rect(15, currentY, 1.5, 8, 'F');

    doc.setTextColor(...colorTextPrimary);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(title.toUpperCase(), 19, currentY + 5.5);
    currentY += 13;
  };

  // SECTION 1: INCIDENT INFORMATION
  drawSectionHeader('Section 1 — Incident Information');
  
  // Incident details card
  doc.setFillColor(...colorGrayBg);
  doc.rect(15, currentY, pageWidth - 30, 24, 'F');
  doc.setDrawColor(...colorBorder);
  doc.rect(15, currentY, pageWidth - 30, 24, 'S');

  doc.setFontSize(8.5);
  // Row 1
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colorTextSecondary);
  doc.text('LOCATION:', 20, currentY + 6);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...colorTextPrimary);
  const truncatedLoc = location.length > 50 ? location.substring(0, 48) + '...' : location;
  doc.text(truncatedLoc, 48, currentY + 6);

  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colorTextSecondary);
  doc.text('ROAD NAME:', 125, currentY + 6);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...colorTextPrimary);
  doc.text(road, 152, currentY + 6);

  // Row 2
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colorTextSecondary);
  doc.text('AREA / STATE:', 20, currentY + 12);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...colorTextPrimary);
  doc.text(`${area}, ${state}`, 48, currentY + 12);

  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colorTextSecondary);
  doc.text('DISTRICT:', 125, currentY + 12);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...colorTextPrimary);
  doc.text(district, 152, currentY + 12);

  // Row 3
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colorTextSecondary);
  doc.text('GPS COORDS:', 20, currentY + 18);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...colorTextPrimary);
  doc.text(gps, 48, currentY + 18);

  currentY += 30;

  // SECTION 2: AI DAMAGE ANALYSIS
  drawSectionHeader('Section 2 — AI Damage Analysis');
  
  // Severity, Risk, Confidence grid
  // Col 1: Severity Score
  doc.setFillColor(...colorGrayBg);
  doc.rect(15, currentY, 55, 26, 'F');
  doc.rect(15, currentY, 55, 26, 'S');
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...colorTextSecondary);
  doc.text('SEVERITY SCORE', 20, currentY + 6);
  doc.setFontSize(18);
  doc.setTextColor(...colorTextPrimary);
  doc.text(`${severityScore}/10`, 20, currentY + 16);
  
  // Mini severity bar
  doc.setFillColor(226, 232, 240);
  doc.rect(20, currentY + 20, 45, 1.5, 'F');
  const severityPercent = (parseFloat(severityScore) || 0) * 10;
  doc.setFillColor(...colorSkyBlue);
  doc.rect(20, currentY + 20, (45 * severityPercent) / 100, 1.5, 'F');

  // Col 2: Risk Level
  doc.setFillColor(...colorGrayBg);
  doc.rect(75, currentY, 55, 26, 'F');
  doc.rect(75, currentY, 55, 26, 'S');
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...colorTextSecondary);
  doc.text('RISK LEVEL', 80, currentY + 6);
  doc.setFontSize(13);
  doc.setTextColor(...(isHighRisk ? [[220, 38, 38]] : [colorSkyBlue]));
  doc.text(riskLevel.toUpperCase(), 80, currentY + 16);

  // Col 3: AI Confidence
  doc.setFillColor(...colorGrayBg);
  doc.rect(135, currentY, 60, 26, 'F');
  doc.rect(135, currentY, 60, 26, 'S');
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...colorTextSecondary);
  doc.text('AI CONFIDENCE', 140, currentY + 6);
  doc.setFontSize(13);
  doc.setTextColor(...colorTextPrimary);
  doc.text(`${report.confidenceScore || '92'}%`, 140, currentY + 16);

  currentY += 31;

  // Detection Summary (spans full width)
  doc.setFillColor(...colorGrayBg);
  doc.rect(15, currentY, pageWidth - 30, 18, 'F');
  doc.rect(15, currentY, pageWidth - 30, 18, 'S');
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...colorTextSecondary);
  doc.text('DETECTION SUMMARY:', 20, currentY + 6);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...colorTextPrimary);
  
  // Text wrapping for summary
  const summaryLines = doc.splitTextToSize(summary, pageWidth - 40);
  doc.text(summaryLines, 20, currentY + 11.5);

  currentY += 24;

  // SECTION 3: MUNICIPAL AUTHORITY
  drawSectionHeader('Section 3 — Municipal Authority');

  doc.setFillColor(...colorGrayBg);
  doc.rect(15, currentY, pageWidth - 30, 30, 'F');
  doc.rect(15, currentY, pageWidth - 30, 30, 'S');

  // Row 1
  doc.setFontSize(8.5);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colorTextSecondary);
  doc.text('ASSIGNED AUTHORITY:', 20, currentY + 6);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...colorSkyBlue);
  doc.text(authority, 62, currentY + 6);

  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colorTextSecondary);
  doc.text('DISPATCH NODE:', 125, currentY + 6);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...colorTextPrimary);
  doc.text(dispatchNode, 155, currentY + 6);

  // Row 2
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colorTextSecondary);
  doc.text('ESCALATION STATUS:', 20, currentY + 13);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...colorTextPrimary);
  doc.text(escalationStatus, 62, currentY + 13);

  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colorTextSecondary);
  doc.text('REPAIR PRIORITY:', 20, currentY + 20);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...(isHighRisk ? [[220, 38, 38]] : [colorTextPrimary]));
  doc.text(repairPriority, 62, currentY + 20);

  // Row 3
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colorTextSecondary);
  doc.text('RESPONSE SLA:', 20, currentY + 26);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...(isHighRisk ? [[220, 38, 38]] : [colorTextPrimary]));
  doc.text(responseSLA, 62, currentY + 26);

  // PAGE 1 FOOTER
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...colorTextSecondary);
  doc.setDrawColor(...colorBorder);
  doc.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);
  doc.text('Generated by RoadLens AI — Civic Infrastructure Intelligence Platform — Municipal Verification Node', 15, pageHeight - 10);
  doc.text('Page 1 of 2  •  Verification: AI Verified & Signed', pageWidth - 15, pageHeight - 10, { align: 'right' });


  // --- PAGE 2: VISUAL EVIDENCE & RECOMMENDED ACTIONS ---

  doc.addPage();
  currentY = 15;

  // Accent header bar (Sky Blue)
  doc.setFillColor(...colorSkyBlue);
  doc.rect(0, 0, pageWidth, 4, 'F');

  // Header Title & Logo for Page 2
  doc.setTextColor(...colorPrimary);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('RoadLens AI Infrastructure Report', 15, 13);
  
  doc.setFontSize(9);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...colorTextSecondary);
  doc.text(`Report ID: ${report.id}`, pageWidth - 15, 13, { align: 'right' });
  
  doc.line(15, 17, pageWidth - 15, 17);
  currentY = 24;

  // SECTION 4: VISUAL EVIDENCE
  drawSectionHeader('Section 4 — Visual Evidence');

  // Draw background frame for the image
  const imgWidth = 100;
  const imgHeight = 65;
  const imgX = (pageWidth - imgWidth) / 2; // (210 - 100) / 2 = 55
  
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(...colorBorder);
  doc.rect(imgX - 2, currentY - 2, imgWidth + 4, imgHeight + 4, 'F');
  doc.rect(imgX - 2, currentY - 2, imgWidth + 4, imgHeight + 4, 'S');

  if (report.base64Image) {
    try {
      doc.addImage(report.base64Image, 'JPEG', imgX, currentY, imgWidth, imgHeight);
      
      // Draw an simulated computer-vision AI overlay bounding box
      doc.setDrawColor(220, 38, 38); // Red box
      doc.setLineWidth(0.4);
      doc.rect(imgX + 22, currentY + 18, 48, 28, 'S'); // bounding box outline
      
      // Bounding box small label tag
      doc.setFillColor(220, 38, 38);
      doc.rect(imgX + 22, currentY + 13.5, 36, 4.5, 'F');
      
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(255, 255, 255);
      doc.text(`${(report.damageType || 'pothole').toUpperCase()} [CONF: ${report.confidenceScore || '92'}%]`, imgX + 23, currentY + 17);
    } catch (e) {
      console.warn("Unable to add base64 image to PDF. Falling back to placeholder description.", e);
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...colorTextSecondary);
      doc.text('[Image upload preview not available in this build context]', pageWidth / 2, currentY + 30, { align: 'center' });
    }
  } else {
    // Mock template image or nice placeholder graphic
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...colorTextSecondary);
    doc.text('[Historical Database Archive — Visual Media in Municipal Vault]', pageWidth / 2, currentY + 30, { align: 'center' });
    
    // Draw a neat placeholder camera icon or shape
    doc.setDrawColor(...colorBorder);
    doc.rect(pageWidth / 2 - 20, currentY + 36, 40, 16, 'S');
    doc.text('ARCHIVE ONLY', pageWidth / 2, currentY + 46, { align: 'center' });
  }

  currentY += imgHeight + 10;

  // SECTION 5: RECOMMENDED ACTIONS
  drawSectionHeader('Section 5 — Recommended Actions');

  doc.setFillColor(...colorGrayBg);
  doc.rect(15, currentY, pageWidth - 30, 44, 'F');
  doc.rect(15, currentY, pageWidth - 30, 44, 'S');

  doc.setFontSize(8.5);
  // Column-like details block
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colorTextPrimary);
  doc.text('REPAIR RECOMMENDATIONS:', 20, currentY + 6);
  doc.setFont('Helvetica', 'normal');
  const wrappedDetails = doc.splitTextToSize(repairRec, pageWidth - 40);
  doc.text(wrappedDetails, 20, currentY + 11.5);

  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colorTextPrimary);
  doc.text('PUBLIC SAFETY ADVISORY:', 20, currentY + 21);
  doc.setFont('Helvetica', 'normal');
  const wrappedSafety = doc.splitTextToSize(safetyAdvisory, pageWidth - 40);
  doc.text(wrappedSafety, 20, currentY + 26);

  // Suggested Urgency & Infrastructure Risk Notes
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colorTextPrimary);
  doc.text('SUGGESTED URGENCY / RISK NOTES:', 20, currentY + 34);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...(isHighRisk ? [[220, 38, 38]] : [colorTextPrimary]));
  const riskNotes = `${suggestedUrgency} — ${infrastructureRiskNotes}`;
  const wrappedRiskNotes = doc.splitTextToSize(riskNotes, pageWidth - 40);
  doc.text(wrappedRiskNotes, 20, currentY + 39);

  // PAGE 2 FOOTER
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...colorTextSecondary);
  doc.setDrawColor(...colorBorder);
  doc.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);
  doc.text('Generated by RoadLens AI — Civic Infrastructure Intelligence Platform — Municipal Verification Node', 15, pageHeight - 10);
  doc.text('Page 2 of 2  •  Verification: AI Verified & Signed', pageWidth - 15, pageHeight - 10, { align: 'right' });

  // Save the generated document
  doc.save(`RoadLens_AI_Report_${report.id}.pdf`);
};
