import React from 'react';
import { User, Users } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  name: string;
  lastMessage?: string;
  timestamp: Date;
  unreadCount: number;
  participants: string[];
}

interface ChatListProps {
  chats: Chat[];
  selectedChatId?: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onNewGroupChat: () => void;
}

export function ChatList({
  chats,
  selectedChatId,
  onSelectChat,
  onNewChat,
  onNewGroupChat,
}: ChatListProps) {
  return (
    <div className="w-80 border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="space-y-2">
          <button
            onClick={onNewChat}
            className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg flex items-center"
          >
            <User className="w-4 h-4 mr-2" />
            Nuova Chat
          </button>
          <button
            onClick={onNewGroupChat}
            className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg flex items-center"
          >
            <Users className="w-4 h-4 mr-2" />
            Nuovo Gruppo
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={cn(
              'w-full p-4 text-left hover:bg-gray-50 flex items-start space-x-3',
              selectedChatId === chat.id && 'bg-blue-50'
            )}
          >
            <div className="flex-shrink-0">
              {chat.type === 'direct' ? (
                <User className="w-8 h-8 text-gray-400" />
              ) : (
                <Users className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {chat.name}
                </p>
                <p className="text-xs text-gray-500">
                  {chat.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {chat.lastMessage && (
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              )}
            </div>
            {chat.unreadCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                {chat.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}