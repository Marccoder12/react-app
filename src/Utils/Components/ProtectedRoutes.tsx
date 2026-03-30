import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// const ProtectedRoutes = () => {
//   const user = true;
//   return user ? <Outlet /> : <Navigate to="auth/login" />;
// };

export default function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  //If not looged in -> send to login
  if (!user) return <Navigate to="/auth/login" replace />;

  //Logged in -> show the protected page
  return <Outlet />;
}
