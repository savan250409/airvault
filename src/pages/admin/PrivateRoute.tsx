import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  if (!isLoggedIn) {
    // अगर user login नहीं है → login page redirect
    return <Navigate to="/admin" replace />;
  }

  // login है → protected routes render होंगे
  return <Outlet />;
};

export default PrivateRoute;
