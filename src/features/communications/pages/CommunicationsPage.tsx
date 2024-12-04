import React, { useState } from 'react';
import { ChatList, type Chat } from '../components/ChatList';
import { ChatWindow, type Message } from '../components/ChatWindow';
import { NewChatModal } from '../components/NewChatModal';

// Mock data
const mockUsers = [
  { id: '1', name: 'Mario Rossi', department: 'Amministrazione' },
  { id: '2', name: 'Laura Bianchi', department: 'Buste Paga' },
  { id: '3', name: 'Giuseppe Verdi', department: 'Contabilità' },
];

const mockChats: Chat[] = [
  {
    id: '1',
    type: 'direct',
    name: 'Mario Rossi',
    lastMessage: 'Ciao, come stai?',
    timestamp: new Date(),
    unreadCount: 2,
    participants: ['1'],
  },
  {
    id: '2',
    type: 'group',
    name: 'Team Buste Paga',
    lastMessage: 'Riunione alle 15:00',
    timestamp: new Date(),
    unreadCount: 0,
    participants: ['1', '2', '3'],
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    chatId: '1',
    senderId: 'other',
    content: 'Ciao, come stai?',
    timestamp: new Date(),
    status: 'read',
  },
  {
    id: '2',
    chatId: '1',
    senderId: 'currentUser',
    content: 'Tutto bene, grazie! Tu?',
    timestamp: new Date(),
    status: 'sent',
  },
];

export function CommunicationsPage() {
  const [chats] = useState<Chat[]>(mockChats);
  const [messages] = useState<Message[]>(mockMessages);
  const [selectedChatId, setSelectedChatId] = useState<string>();
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const handleSendMessage = (content: string) => {
    console.log('Sending message:', content);
  };

  const handleAttachFile = () => {
    console.log('Attaching file');
  };

  const handleCreateChat = (participants: string[]) => {
    console.log('Creating chat with participants:', participants);
  };

  const handleCreateGroupChat = (participants: string[]) => {
    console.log('Creating group chat with participants:', participants);
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] flex">
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
        onNewChat={() => setIsNewChatModalOpen(true)}
        onNewGroupChat={() => setIsNewGroupModalOpen(true)}
      />

      {selectedChat ? (
        <ChatWindow
          chat={selectedChat}
          messages={messages.filter((m) => m.chatId === selectedChat.id)}
          onSendMessage={handleSendMessage}
          onAttachFile={handleAttachFile}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Seleziona una chat per iniziare</p>
        </div>
      )}

      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onCreateChat={handleCreateChat}
        users={mockUsers}
      />

      <NewChatModal
        isOpen={isNewGroupModalOpen}
        onClose={() => setIsNewGroupModalOpen(false)}
        onCreateChat={handleCreateGroupChat}
        users={mockUsers}
        isGroup
      />
    </div>
  );
}