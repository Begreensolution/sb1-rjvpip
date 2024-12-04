import React from 'react';
import { GlobalSearch } from '../search/GlobalSearch';
import { NotificationsPopover } from '../notifications/NotificationsPopover';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center flex-1">
        <GlobalSearch />
      </div>

      <div className="flex items-center space-x-4">
        <NotificationsPopover />
        <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
          <span className="text-sm font-medium">AA</span>
        </div>
      </div>
    </header>
  );
}