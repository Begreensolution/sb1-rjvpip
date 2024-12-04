import { useCallback } from 'react';
import { PERMISSIONS } from '../constants/permissions';

export function usePermissions(userPermissions: string[]) {
  const hasPermission = useCallback(
    (permission: keyof typeof PERMISSIONS) => {
      return userPermissions.includes(PERMISSIONS[permission]);
    },
    [userPermissions]
  );

  const hasAnyPermission = useCallback(
    (permissions: Array<keyof typeof PERMISSIONS>) => {
      return permissions.some((permission) => hasPermission(permission));
    },
    [hasPermission]
  );

  const hasAllPermissions = useCallback(
    (permissions: Array<keyof typeof PERMISSIONS>) => {
      return permissions.every((permission) => hasPermission(permission));
    },
    [hasPermission]
  );

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
}