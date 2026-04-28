// import "bootstrap/dist/css/bootstrap.min.css";
// import "./components/Task";
import { ReactNode } from "react";
import "./mainStyle.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import Home from "./pages/Home";

import ProtectedRoutes from "./Utils/Components/ProtectedRoutes";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import { Welcome } from "./pages/Welcome";
import MainPage from "./features/HomePage/components/MainPage";
import { FineTaskContent } from "./features/FineTaskPage/FineTaskContent";
import { TaskContent } from "./features/TaskPage/TaskContent";
import { StatsContent } from "./features/StatsPage/StatsContent";
import { DashBoardContent } from "./features/DashBoardPage/DashboardContent";
import { SettingsContent } from "./features/SettingsPage/components/SettingsContent";
import { UserPageContent } from "./features/UserPage/components/UserPageContent";
import { FineTaskItem } from "./features/FineTaskPage/FinetaskItem";
import { Subscription } from "./pages/Subscription";
import { ToastProvider } from "./context/ToastContext";
import { NotificationContent } from "./features/NotificationsPage/NotificationContent";
// Your main App
function App() {
  return (
    <div className="App h-full bg-gray-50">
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <Routes>
              <Route element={<SignUp />} path="/auth/register"></Route>
              <Route element={<Login />} path="/auth/login" />
              <Route element={<Welcome />} path="/welcome" />
              <Route element={<ProtectedRoutes />}>
                <Route element={<Home />} path="/home">
                  <Route path="dashboard" element={<DashBoardContent />}>
                    <Route
                      index={true}
                      path="finetasks"
                      element={<FineTaskContent />}
                    ></Route>
                    <Route path="tasks" element={<TaskContent />}></Route>
                  </Route>
                  <Route path="stats" element={<StatsContent />}></Route>
                  <Route
                    path="notification"
                    element={<NotificationContent />}
                  ></Route>
                  <Route path="settings" element={<SettingsContent />}></Route>
                  <Route path="user" element={<UserPageContent />}></Route>
                </Route>
                <Route path="/subscription" element={<Subscription />}></Route>
              </Route>
            </Routes>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
