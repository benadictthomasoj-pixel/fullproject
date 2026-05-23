import React from 'react';
import BackgroundMesh from './BackgroundMesh';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ChatWorkspace from './ChatWorkspace';
import ReportsTab from './ReportsTab';
import AnalyticsTab from './AnalyticsTab';
import AuthoritiesTab from './AuthoritiesTab';
import { useWorkflowStore } from '../../store/useWorkflowStore';

function App() {
  const activeTab = useWorkflowStore((state) => state.activeTab);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'chatbot':
        return <ChatWorkspace />;
      case 'reports':
        return <ReportsTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'authorities':
        return <AuthoritiesTab />;
      default:
        return <ChatWorkspace />;
    }
  };

  return (
    <div className="min-h-screen w-screen flex relative overflow-hidden bg-[#FCFDFE]">
      {/* Ambient Animated Mesh Background */}
      <BackgroundMesh />

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Workspace Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Floating Top Context Bar */}
        <TopBar />

        {/* View Content Area */}
        <main className="flex-1 flex flex-col min-h-0 relative">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

export default App;
