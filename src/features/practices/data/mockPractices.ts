import { Practice } from '../types';

export const mockPractices: Practice[] = [
  {
    id: '1',
    title: 'Busta Paga Marzo 2024',
    description: 'Elaborazione buste paga per il mese di marzo 2024',
    status: 'in_progress',
    priority: 'high',
    assignedTo: ['1', '2'],
    client: {
      id: '1',
      name: 'Mario Rossi',
      type: 'company',
      company: 'Rossi SRL',
    },
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-15'),
    dueDate: new Date('2024-03-31'),
    category: 'Buste Paga',
    tags: ['urgente', 'mensile'],
    progress: 65,
    attachments: [
      {
        id: '1',
        name: 'Presenze_Marzo.pdf',
        type: 'application/pdf',
        url: '/files/presenze_marzo.pdf',
        size: 245000,
        uploadedAt: new Date('2024-03-15'),
        uploadedBy: '1',
      },
    ],
    timeline: [
      {
        id: '1',
        type: 'status_change',
        content: 'Pratica avviata',
        user: {
          id: '1',
          name: 'Laura Bianchi',
        },
        timestamp: new Date('2024-03-01'),
      },
      {
        id: '2',
        type: 'attachment',
        content: 'Caricato documento presenze',
        user: {
          id: '2',
          name: 'Giuseppe Verdi',
        },
        timestamp: new Date('2024-03-15'),
      },
    ],
  },
  // Add more mock practices...
];