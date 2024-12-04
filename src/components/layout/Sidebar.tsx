import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Users,
  FileText,
  BarChart2,
  MessageSquare,
  Settings,
  Shield,
  Brain,
  LogOut,
  Home,
} from 'lucide-react';
import { NavItem } from './NavItem';

const mainNavItems = [
  { icon: <Home />, label: 'Dashboard', to: '/' },
  { icon: <Users />, label: 'Gestione Utenti', to: '/users' },
  { icon: <FileText />, label: 'Pratiche', to: '/practices' },
  { icon: <BarChart2 />, label: 'Analytics', to: '/analytics' },
  { icon: <MessageSquare />, label: 'Comunicazioni', to: '/communications' },
  { icon: <Settings />, label: 'Configurazione', to: '/settings' },
  { icon: <Shield />, label: 'Sicurezza', to: '/security' },
  { icon: <Brain />, label: 'Assistente AI', to: '/ai-assistant' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Cafasso Admin</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {mainNavItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              to={item.to}
              active={location.pathname === item.to}
            />
          ))}
        </div>
      </nav>

      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <NavItem icon={<LogOut />} label="Disconnetti" to="/logout" />
      </div>
    </aside>
  );
}