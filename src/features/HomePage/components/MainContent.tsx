import { Outlet } from "react-router-dom";

export const MainContent = () => {
  return (
    <main className="h-28/30 w-auto">
      <Outlet />
    </main>
  );
};
