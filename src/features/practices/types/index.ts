export interface Practice {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'review' | 'completed' | 'delayed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string[];
  client: {
    id: string;
    name: string;
    type: 'company' | 'individual' | 'studio';
    company?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  completedAt?: Date;
  category: string;
  tags: string[];
  progress: number;
  parentPractice?: string; // For linked practices (e.g., company payroll with multiple employees)
  childPractices?: string[]; // For linked practices
  attachments: {
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
    uploadedAt: Date;
    uploadedBy: string;
  }[];
  timeline: {
    id: string;
    type: 'status_change' | 'comment' | 'attachment' | 'assignment';
    content: string;
    user: {
      id: string;
      name: string;
      avatar?: string;
    };
    timestamp: Date;
    metadata?: Record<string, any>;
  }[];
}

export interface PracticeFilter {
  status?: Practice['status'][];
  priority?: Practice['priority'][];
  assignedTo?: string[];
  clientType?: ('company' | 'individual' | 'studio')[];
  category?: string[];
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  parentPracticeOnly?: boolean;
}

export interface PracticeSortOption {
  field: keyof Practice;
  direction: 'asc' | 'desc';
}