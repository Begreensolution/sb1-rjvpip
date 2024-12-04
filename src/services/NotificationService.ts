import { io, Socket } from 'socket.io-client';
import { Notification } from '../components/notifications/NotificationList';

export class NotificationService {
  private socket: Socket | null = null;
  private listeners: ((notification: Notification) => void)[] = [];

  connect() {
    // In a real application, this would connect to your WebSocket server
    this.socket = io('http://localhost:3001', {
      autoConnect: false,
    });

    this.socket.on('notification', (notification: Notification) => {
      this.listeners.forEach(listener => listener(notification));
    });

    this.socket.connect();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onNotification(listener: (notification: Notification) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Mock method to simulate receiving notifications
  mockNotification() {
    const notification: Notification = {
      id: Date.now().toString(),
      title: 'Nuova notifica',
      message: 'Questa è una notifica di test',
      type: 'info',
      timestamp: new Date(),
      read: false,
    };

    this.listeners.forEach(listener => listener(notification));
  }
}

export const notificationService = new NotificationService();