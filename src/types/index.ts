export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  department?: string;
}

export interface Practice {
  id: string;
  clientId: string;
  assignedTo: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  type: string;
  documents: Document[];
}

export interface Client {
  id: string;
  name: string;
  email: string;
  department: string;
  assignedTo: string[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
  status: 'pending' | 'processed' | 'error';
}