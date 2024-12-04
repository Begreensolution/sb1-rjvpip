import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Chat } from './ChatList';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatWindowProps {
  chat: Chat;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onAttachFile: () => void;
}

export function ChatWindow({
  chat,
  messages,
  onSendMessage,
  onAttachFile,
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-shrink-0 border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">{chat.name}</h2>
        <p className="text-sm text-gray-500">
          {chat.type === 'group' ? `${chat.participants.length} partecipanti` : 'Chat privata'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === 'currentUser'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.senderId === 'currentUser'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex-shrink-0 border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onAttachFile}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Scrivi un messaggio..."
            className="flex-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 text-blue-600 hover:text-blue-700 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}