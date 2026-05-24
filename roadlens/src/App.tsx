import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LocationProvider } from './contexts/LocationContext';

import { Overview } from './pages/Overview';
import { RoadMonitoring } from './pages/RoadMonitoring';
import { Transparency } from './pages/Transparency';
import { Complaints } from './pages/Complaints';
import { Authorities } from './pages/Authorities';
import { Analytics } from './pages/Analytics';
import { Feedback } from './pages/Feedback';

const Settings = () => <div className="animate-fade-in" style={{ padding: '2rem' }}><h2>Settings</h2></div>;

function App() {
  return (
    <LocationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="monitoring" element={<RoadMonitoring />} />
            <Route path="transparency" element={<Transparency />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="authorities" element={<Authorities />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocationProvider>
  );
}

export default App;
