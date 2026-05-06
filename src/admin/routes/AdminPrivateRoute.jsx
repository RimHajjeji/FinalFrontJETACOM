import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function AdminPrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
