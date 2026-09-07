import { Outlet } from "react-router-dom";
import { FineTaskContextProvider } from "../../FineTaskPage/context/FineTaskContext";

export const MainContent = () => {
  return (
    <main className='h-full w-auto'>
      <FineTaskContextProvider>
        <Outlet />
      </FineTaskContextProvider>
    </main>
  );
};
