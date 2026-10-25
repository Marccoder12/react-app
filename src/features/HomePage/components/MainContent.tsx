import { Outlet } from "react-router-dom";
import { FineTaskContextProvider } from "../../../context/FineTaskContext";
import { StatsContextProvider } from "../../../context/StatsContext";
import { NotificationContextProvider } from "../../../context/NotificationContext";
import { NotificationNotifier } from "../../NotificationsPage/components/NotificationNotifier";

export const MainContent = () => {
  return (
    <main className='h-full w-full'>
      <NotificationContextProvider>
        {/* <NotificationNotifier /> */}
        <FineTaskContextProvider>
          <StatsContextProvider>
            <Outlet />
          </StatsContextProvider>
        </FineTaskContextProvider>
      </NotificationContextProvider>
    </main>
  );
};
