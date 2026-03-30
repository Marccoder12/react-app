import { Outlet } from "react-router-dom";

export const MainContent = () => {
  return (
    <main className="h-11/12 w-auto">
      <Outlet />
    </main>
  );
};
