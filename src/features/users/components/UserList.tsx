import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { UserTable } from './UserTable';
import { UserForm } from './UserForm';
import { Modal } from '../../../components/ui/Modal';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { AdminUser } from '../../../features/admin/types';
import type { UserFormData } from '../schemas/userSchema';

const mockUsers: AdminUser[] = [
  {
    id: '1',
    username: 'mario.rossi',
    email: 'mario.rossi@cafasso.it',
    role: 'admin',
    department: 'Amministrazione',
    permissions: ['all'],
    lastLogin: new Date('2024-03-19T10:30:00'),
    status: 'active',
    twoFactorEnabled: true,
  },
  {
    id: '2',
    username: 'laura.bianchi',
    email: 'laura.bianchi@cafasso.it',
    role: 'manager',
    department: 'Buste Paga',
    permissions: ['manage_team', 'view_reports'],
    lastLogin: new Date('2024-03-19T09:15:00'),
    status: 'active',
    twoFactorEnabled: false,
  },
];

export function UserList() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const handleCreateUser = (data: UserFormData) => {
    const newUser: AdminUser = {
      id: Date.now().toString(),
      ...data,
      lastLogin: new Date(),
      permissions: [],
    };
    setUsers(prev => [...prev, newUser]);
    setIsCreateModalOpen(false);
  };

  const handleEditUser = (data: UserFormData) => {
    if (!selectedUser) return;
    
    setUsers(prev =>
      prev.map(user =>
        user.id === selectedUser.id
          ? { ...user, ...data }
          : user
      )
    );
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
    setSelectedUser(null);
  };

  const openEditModal = (user: AdminUser) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (user: AdminUser) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Gestione Utenti</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Nuovo Utente
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <UserTable
          users={users}
          onEdit={openEditModal}
          onDelete={openDeleteDialog}
        />
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Nuovo Utente"
      >
        <UserForm
          onSubmit={handleCreateUser}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        title="Modifica Utente"
      >
        <UserForm
          user={selectedUser}
          onSubmit={handleEditUser}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteUser}
        title="Conferma Eliminazione"
        message={`Sei sicuro di voler eliminare l'utente ${selectedUser?.username}? Questa azione non può essere annullata.`}
        confirmLabel="Elimina"
      />
    </div>
  );
}