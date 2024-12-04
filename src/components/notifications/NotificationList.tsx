import React from 'react';
import { formatDateTime } from '../../lib/utils';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  read: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClose: () => void;
}

export function NotificationList({ notifications, onMarkAsRead, onClose }: NotificationListProps) {
  if (!notifications.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        Nessuna notifica
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 hover:bg-gray-50 cursor-pointer ${
            !notification.read ? 'bg-blue-50' : ''
          }`}
          onClick={() => {
            onMarkAsRead(notification.id);
            onClose();
          }}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900">
              {notification.title}
            </h3>
            <span className="text-xs text-gray-500">
              {formatDateTime(notification.timestamp)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
        </div>
      ))}
    </div>
  );
}