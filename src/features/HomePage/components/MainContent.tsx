import { Outlet } from "react-router-dom";
import { FineTaskContextProvider } from "../../FineTaskPage/context/FineTaskContext";

export const MainContent = () => {
  return (
    <main className="h-28/30 w-auto">
      <FineTaskContextProvider>

      <Outlet />
      </FineTaskContextProvider>
    </main>
  );
};
