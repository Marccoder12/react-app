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
      <>
        {/* <div className="text-blue-400">Loading...</div> */}
        {/* <img
          src={
            "/assets/logo.png"
          }
        /> */}
        <div className="flex items-center justify-center h-screen">
          <div className=" w-5 h-5 bg-blue-600 animate-ping"></div>
        </div>
      </>
    );

  //If not looged in -> send to login
  if (!user) return <Navigate to="/auth/login" replace />;

  //Logged in -> show the protected page
  return <Outlet />;
}
