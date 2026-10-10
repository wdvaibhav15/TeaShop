
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // Already logged in? Redirect to dashboard.
  if (token && user) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
