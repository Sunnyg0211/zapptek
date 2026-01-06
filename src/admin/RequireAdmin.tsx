import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }: { children: JSX.Element }) {
  const user = JSON.parse(localStorage.getItem("zapptek_user") || "null");

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "admin" && user.role !== "staff") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
