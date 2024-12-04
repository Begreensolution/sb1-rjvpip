import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { NotificationList } from './NotificationList';
import { useNotifications } from '../../hooks/useNotifications';

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-500"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Notifiche</h2>
          </div>
          <NotificationList
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onClose={() => setIsOpen(false)}
          />
          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Segna tutte come lette
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}