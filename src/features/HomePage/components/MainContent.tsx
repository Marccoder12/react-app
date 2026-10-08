import { Outlet } from "react-router-dom";
import { FineTaskContextProvider } from "../../../context/FineTaskContext";
import { StatsContextProvider } from "../../../context/StatsContext";

export const MainContent = () => {
  return (
    <main className='h-full w-auto'>
      <FineTaskContextProvider>
        <StatsContextProvider>
          <Outlet />
        </StatsContextProvider>
      </FineTaskContextProvider>
    </main>
  );
};
