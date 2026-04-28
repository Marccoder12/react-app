import { useState } from "react";
import { NotificationCard } from "./components/NotificationCard";

export const NotificationContent = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex">
      <div className="p-4 grow-1">
        <ol>
          <NotificationCard
            title="Welcome User"
            message="Finish setting up your Pin"
          />
        </ol>
      </div>
    </div>
  );
};
