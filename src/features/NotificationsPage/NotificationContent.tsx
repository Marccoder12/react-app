import { useState } from "react";
import { NotificationCard } from "./components/NotificationCard";
import { EnableNotificationsButton } from "./components/NotificationNotifier";

export const NotificationContent = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex'>
      <div className='p-4 grow-1'>
        <EnableNotificationsButton />
        <ol>
          <NotificationCard
            title='Welcome User'
            message='Finish setting up your Pin'
          />
        </ol>
      </div>
    </div>
  );
};
