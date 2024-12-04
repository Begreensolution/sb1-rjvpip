import React from 'react';
import { usePermissions } from '../hooks/usePermissions';
import { PERMISSIONS } from '../constants/permissions';

interface PermissionGuardProps {
  children: React.ReactNode;
  permissions: Array<keyof typeof PERMISSIONS>;
  requireAll?: boolean;
  fallback?: React.ReactNode;
}

export function PermissionGuard({
  children,
  permissions,
  requireAll = false,
  fallback = null,
}: PermissionGuardProps) {
  const { hasAnyPermission, hasAllPermissions } = usePermissions([]);
  const hasAccess = requireAll ? hasAllPermissions(permissions) : hasAnyPermission(permissions);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}