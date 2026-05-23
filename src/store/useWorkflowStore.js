import { create } from 'zustand';

export const useWorkflowStore = create((set) => ({
  // Core Chat & Messaging
  messages: [
    {
      id: 'greeting',
      sender: 'ai',
      text: "Hello, I'm RoadLens AI. I can help analyze road infrastructure issues, generate municipal reports, and connect incidents to responsible authorities.",
      timestamp: new Date().toISOString(),
      type: 'text',
      actions: ['report_issue', 'capture_image', 'recent_reports'] // Starting Action Cards
    }
  ],
  
  // Active Workflow State
  isAnalyzing: false,
  activeWorkflowStep: 0, // 0 to 7
  workflowSteps: [
    { id: 1, name: "Uploading Image", status: "pending" }, // pending | active | completed
    { id: 2, name: "Surface Analysis", status: "pending" },
    { id: 3, name: "Damage Detection", status: "pending" },
    { id: 4, name: "Metadata Validation", status: "pending" },
    { id: 5, name: "Geolocation Resolution", status: "pending" },
    { id: 6, name: "Authority Mapping", status: "pending" },
    { id: 7, name: "Report Generation", status: "pending" }
  ],
  
  // Reports
  currentReport: null,
  reportsHistory: [],

  // Geolocation States
  locationData: {
    city: "",
    state: "",
    district: "",
    road: "",
    authority: "",
    roadLocationDetected: false
  },
  isLocationModalOpen: false,
  onLocationResolvedCallback: null,
  isUploadBarVisible: false,
  
  // Dashboard Integration Context
  dashboardContext: '/',
  setDashboardContext: (path) => set({ dashboardContext: path }),
  
  // Navigation & UI Context
  activeTab: 'chatbot', // 'chatbot' | 'reports' | 'analytics' | 'authorities'
  sidebarOpen: true,
  selectedRegion: 'Chennai, Tamil Nadu',

  // Actions
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, { id: Math.random().toString(36).substring(7), timestamp: new Date().toISOString(), ...message }] 
  })),

  updateMessage: (id, updatedFields) => set((state) => ({
    messages: state.messages.map((msg) => msg.id === id ? { ...msg, ...updatedFields } : msg)
  })),

  collapseOldWorkflows: () => set((state) => ({
    messages: state.messages.map((msg) => {
      if (msg.type === 'workflow' || msg.type === 'report' || msg.type === 'actions') {
        return { ...msg, isCollapsed: true };
      }
      return msg;
    })
  })),

  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  
  setActiveWorkflowStep: (stepNumber) => set((state) => {
    const updatedSteps = state.workflowSteps.map((step) => {
      if (step.id < stepNumber) return { ...step, status: 'completed' };
      if (step.id === stepNumber) return { ...step, status: 'active' };
      return { ...step, status: 'pending' };
    });
    return { 
      activeWorkflowStep: stepNumber,
      workflowSteps: updatedSteps
    };
  }),

  resetWorkflowSteps: () => set((state) => ({
    activeWorkflowStep: 0,
    workflowSteps: state.workflowSteps.map((step) => ({ ...step, status: 'pending' }))
  })),

  setCurrentReport: (report) => set((state) => {
    const history = report ? [...state.reportsHistory, report] : state.reportsHistory;
    return {
      currentReport: report,
      reportsHistory: history
    };
  }),

  // Location Triggers
  setLocationData: (locationData) => set({ locationData }),
  setLocationModalOpen: (isLocationModalOpen) => set({ isLocationModalOpen }),
  setOnLocationResolvedCallback: (onLocationResolvedCallback) => set({ onLocationResolvedCallback }),
  setUploadBarVisible: (isUploadBarVisible) => set({ isUploadBarVisible }),

  setActiveTab: (activeTab) => set({ activeTab }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setSelectedRegion: (selectedRegion) => set({ selectedRegion }),

  resetWorkflow: () => set((state) => {
    // Collapse existing runs before starting a new one
    const collapsedMessages = state.messages.map((msg) => {
      if (msg.type === 'workflow' || msg.type === 'report' || msg.type === 'actions') {
        return { ...msg, isCollapsed: true };
      }
      return msg;
    });

    return {
      messages: [
        ...collapsedMessages,
        {
          id: Math.random().toString(36).substring(7),
          sender: 'ai',
          text: "Ready for another inspection. Please upload an image of a road surface, crack, pothole, or other damage to analyze.",
          timestamp: new Date().toISOString(),
          type: 'text',
          actions: ['report_issue', 'capture_image', 'recent_reports']
        }
      ],
      isAnalyzing: false,
      activeWorkflowStep: 0,
      workflowSteps: state.workflowSteps.map((step) => ({ ...step, status: 'pending' })),
      currentReport: null,
      locationData: {
        city: "",
        state: "",
        district: "",
        road: "",
        authority: "",
        roadLocationDetected: false
      },
      isLocationModalOpen: false,
      onLocationResolvedCallback: null,
      isUploadBarVisible: false
    };
  })
}));
