export const PERMISSIONS = {
  // User Management
  MANAGE_USERS: 'manage_users',
  VIEW_USERS: 'view_users',
  CREATE_USERS: 'create_users',
  EDIT_USERS: 'edit_users',
  DELETE_USERS: 'delete_users',
  
  // Role Management
  MANAGE_ROLES: 'manage_roles',
  VIEW_ROLES: 'view_roles',
  CREATE_ROLES: 'create_roles',
  EDIT_ROLES: 'edit_roles',
  DELETE_ROLES: 'delete_roles',
  
  // Practice Management
  MANAGE_PRACTICES: 'manage_practices',
  VIEW_PRACTICES: 'view_practices',
  CREATE_PRACTICES: 'create_practices',
  EDIT_PRACTICES: 'edit_practices',
  DELETE_PRACTICES: 'delete_practices',
  
  // Client Management
  MANAGE_CLIENTS: 'manage_clients',
  VIEW_CLIENTS: 'view_clients',
  CREATE_CLIENTS: 'create_clients',
  EDIT_CLIENTS: 'edit_clients',
  DELETE_CLIENTS: 'delete_clients',
  
  // Report Management
  MANAGE_REPORTS: 'manage_reports',
  VIEW_REPORTS: 'view_reports',
  CREATE_REPORTS: 'create_reports',
  EXPORT_REPORTS: 'export_reports',
  
  // System Settings
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_SETTINGS: 'view_settings',
  EDIT_SETTINGS: 'edit_settings',
  
  // Audit & Security
  VIEW_AUDIT_LOGS: 'view_audit_logs',
  MANAGE_SECURITY: 'manage_security',
} as const;

export const PERMISSION_DESCRIPTIONS: Record<string, { name: string; description: string }> = {
  [PERMISSIONS.MANAGE_USERS]: {
    name: 'Gestione Utenti',
    description: 'Permette la gestione completa degli utenti',
  },
  [PERMISSIONS.VIEW_USERS]: {
    name: 'Visualizza Utenti',
    description: 'Permette di visualizzare la lista degli utenti',
  },
  [PERMISSIONS.CREATE_USERS]: {
    name: 'Crea Utenti',
    description: 'Permette di creare nuovi utenti',
  },
  [PERMISSIONS.EDIT_USERS]: {
    name: 'Modifica Utenti',
    description: 'Permette di modificare gli utenti esistenti',
  },
  [PERMISSIONS.DELETE_USERS]: {
    name: 'Elimina Utenti',
    description: 'Permette di eliminare gli utenti',
  },
  // ... add descriptions for all permissions
};

export const DEFAULT_ROLES: Role[] = [
  {
    id: 'admin',
    name: 'Amministratore',
    description: 'Accesso completo al sistema',
    permissions: Object.values(PERMISSIONS),
    isSystem: true,
  },
  {
    id: 'manager',
    name: 'Capo Settore',
    description: 'Gestione del team e delle pratiche',
    permissions: [
      PERMISSIONS.VIEW_USERS,
      PERMISSIONS.VIEW_PRACTICES,
      PERMISSIONS.MANAGE_PRACTICES,
      PERMISSIONS.VIEW_CLIENTS,
      PERMISSIONS.VIEW_REPORTS,
      PERMISSIONS.CREATE_REPORTS,
    ],
    isSystem: true,
  },
  {
    id: 'employee',
    name: 'Dipendente',
    description: 'Gestione pratiche assegnate',
    permissions: [
      PERMISSIONS.VIEW_PRACTICES,
      PERMISSIONS.EDIT_PRACTICES,
      PERMISSIONS.VIEW_CLIENTS,
      PERMISSIONS.VIEW_REPORTS,
    ],
    isSystem: true,
  },
];