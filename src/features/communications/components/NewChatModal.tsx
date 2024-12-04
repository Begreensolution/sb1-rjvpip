import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Search } from 'lucide-react';

interface User {
  id: string;
  name: string;
  department: string;
}

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChat: (participants: string[]) => void;
  users: User[];
  isGroup?: boolean;
}

export function NewChatModal({
  isOpen,
  onClose,
  onCreateChat,
  users,
  isGroup = false,
}: NewChatModalProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupName, setGroupName] = useState('');

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUsers.length > 0 && (!isGroup || groupName)) {
      onCreateChat(selectedUsers);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isGroup ? 'Nuovo Gruppo' : 'Nuova Chat'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {isGroup && (
          <div>
            <label
              htmlFor="groupName"
              className="block text-sm font-medium text-gray-700"
            >
              Nome del gruppo
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isGroup ? 'Aggiungi partecipanti' : 'Seleziona utente'}
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca per nome o dipartimento..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-4 max-h-60 overflow-y-auto">
          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <label
                key={user.id}
                className="flex items-center p-2 hover:bg-gray-50 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers([...selectedUsers, user.id]);
                    } else {
                      setSelectedUsers(selectedUsers.filter((id) => id !== user.id));
                    }
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3">
                  <span className="block text-sm font-medium text-gray-900">
                    {user.name}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {user.department}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Annulla
          </button>
          <button
            type="submit"
            disabled={selectedUsers.length === 0 || (isGroup && !groupName)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isGroup ? 'Crea Gruppo' : 'Inizia Chat'}
          </button>
        </div>
      </form>
    </Modal>
  );
}