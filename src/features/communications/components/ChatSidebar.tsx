import React, { useState } from 'react';
import { Search, Users, Building2, UserPlus, UsersPlus } from 'lucide-react';
import { ChatSection } from '../types';
import { ResizablePanel } from '../../admin/components/ResizablePanel';

interface ChatSidebarProps {
  sections: ChatSection[];
  selectedChatId?: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onNewGroupChat: () => void;
  width: number;
  onResize: (width: number) => void;
}

export function ChatSidebar({
  sections,
  selectedChatId,
  onSelectChat,
  onNewChat,
  onNewGroupChat,
  width,
  onResize,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<string>('colleagues');

  const filteredSections = sections.map(section => ({
    ...section,
    chats: section.chats.filter(chat =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <ResizablePanel
      section={{
        id: 'chat-sidebar',
        width,
        minWidth: 280,
        maxWidth: 480,
      }}
      onResize={onResize}
    >
      <div className="h-full flex flex-col bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca nelle chat..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveSection('colleagues')}
            className={`flex-1 p-3 text-sm font-medium ${
              activeSection === 'colleagues'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="h-5 w-5 mx-auto mb-1" />
            Colleghi
          </button>
          <button
            onClick={() => setActiveSection('clients')}
            className={`flex-1 p-3 text-sm font-medium ${
              activeSection === 'clients'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Building2 className="h-5 w-5 mx-auto mb-1" />
            Clienti
          </button>
          <button
            onClick={() => setActiveSection('groups')}
            className={`flex-1 p-3 text-sm font-medium ${
              activeSection === 'groups'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="h-5 w-5 mx-auto mb-1" />
            Gruppi
          </button>
        </div>

        <div className="p-2 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onNewChat}
              className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Nuova Chat
            </button>
            <button
              onClick={onNewGroupChat}
              className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <UsersPlus className="h-4 w-4 mr-2" />
              Nuovo Gruppo
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredSections
            .filter(section => section.type === activeSection)
            .map(section => (
              <div key={section.id}>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.title}
                </div>
                {section.chats.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => onSelectChat(chat.id)}
                    className={`w-full p-3 flex items-start space-x-3 hover:bg-gray-50 ${
                      selectedChatId === chat.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {chat.avatar ? (
                        <img
                          src={chat.avatar}
                          alt={chat.name}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">
                            {chat.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {chat.name}
                        </p>
                        {chat.lastMessage && (
                          <p className="text-xs text-gray-500">
                            {new Date(chat.lastMessage.timestamp).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                      {chat.lastMessage && (
                        <p className="text-sm text-gray-500 truncate">
                          {chat.lastMessage.content}
                        </p>
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
            ))}
        </div>
      </div>
    </ResizablePanel>
  );
}