import React from 'react';
import { UserList } from '../components/UserList';

export function UsersPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestione Utenti</h1>
      </div>
      <UserList />
    </div>
  );
}