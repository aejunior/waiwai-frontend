import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { hasPermission } from "../utils/permissions";
import type { PermissionType } from "../types/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: PermissionType;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const user = useAuthStore((state) => state.user);

  if (!isInitialized) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user && !hasPermission(user.permission, requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
