export interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'employee' | 'client';
  department?: string;
  company?: string;
  online: boolean;
  lastSeen?: Date;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
  }[];
}

export interface Chat {
  id: string;
  type: 'direct' | 'group' | 'client';
  name: string;
  description?: string;
  avatar?: string;
  participants: ChatParticipant[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
  pinned?: boolean;
  muted?: boolean;
}

export interface ChatSection {
  id: string;
  title: string;
  type: 'clients' | 'colleagues' | 'groups';
  chats: Chat[];
}