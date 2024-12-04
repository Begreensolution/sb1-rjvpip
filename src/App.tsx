import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { UsersPage } from './features/users/pages/UsersPage';
import { PracticesPage } from './features/practices/pages/PracticesPage';
import { AnalyticsPage } from './features/analytics/pages/AnalyticsPage';
import { CommunicationsPage } from './features/communications/pages/CommunicationsPage';
import { SettingsPage } from './features/settings/pages/SettingsPage';
import { SecurityPage } from './features/security/pages/SecurityPage';
import { AIAssistantPage } from './features/ai-assistant/pages/AIAssistantPage';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/practices" element={<PracticesPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/communications" element={<CommunicationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;