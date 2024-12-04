import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';
import { AdminUser } from '../../../features/admin/types';
import { formatDateTime } from '../../../lib/utils';

const columnHelper = createColumnHelper<AdminUser>();

interface UserTableProps {
  users: AdminUser[];
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const columns = [
    columnHelper.accessor('username', {
      header: 'Username',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('role', {
      header: 'Ruolo',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('department', {
      header: 'Dipartimento',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Stato',
      cell: info => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            info.getValue() === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {info.getValue() === 'active' ? 'Attivo' : 'Inattivo'}
        </span>
      ),
    }),
    columnHelper.accessor('lastLogin', {
      header: 'Ultimo Accesso',
      cell: info => formatDateTime(info.getValue()),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Azioni',
      cell: info => (
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(info.row.original)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Edit2 className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => onDelete(info.row.original)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}