export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'practices' | 'clients' | 'reports' | 'system';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem?: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
  permissions: string[];
  lastLogin: Date;
  status: 'active' | 'inactive';
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  activityLog: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details: Record<string, any>;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
}

export interface ResizableSection {
  id: string;
  width: number;
  minWidth: number;
  maxWidth: number;
}