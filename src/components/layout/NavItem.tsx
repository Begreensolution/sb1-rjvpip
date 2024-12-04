import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

export function NavItem({ icon, label, to, active }: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center w-full p-3 rounded-lg transition-colors',
        active
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50'
      )}
    >
      <span className="w-5 h-5 mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}