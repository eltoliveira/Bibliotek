import useUserRole from "../hooks/useUserRole";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const role = useUserRole();

  if (role === null) return <div>Carregando...</div>;
  if (role !== "admin") return <Navigate to="/home" />;

  return children;
}