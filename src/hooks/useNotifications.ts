import { useState, useEffect } from 'react';
import { notificationService } from '../services/NotificationService';
import type { Notification } from '../components/notifications/NotificationList';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    notificationService.connect();

    const unsubscribe = notificationService.onNotification((notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    // Simulate real-time notifications for demonstration
    const interval = setInterval(() => {
      notificationService.mockNotification();
    }, 30000);

    return () => {
      unsubscribe();
      notificationService.disconnect();
      clearInterval(interval);
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return {
    notifications,
    markAsRead,
    markAllAsRead,
  };
}