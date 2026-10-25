import { useEffect, useRef, useState } from "react";
import { ViewOpt } from "../DashBoardPage/components/ViewOpt";
import { CreateFineTask } from "./components/CreateFineTask";
import Modal from "./components/Modal";
import { FineTaskItem } from "./FinetaskItem";
import { BankSelector } from "./components/BankSelector";
import { getBanks } from "./services/getBanks";
import { EditContent } from "./components/EditContent";
import { supabase } from "../../lib/supabase/client";
import { useAuth } from "../../context/AuthContext";
import { FineTask } from "../../Utils/types";
import { FineTaskListContent } from "./components/FineTaskListContent";
import { FineTaskEditContent } from "./components/FineTaskEditContent";
import { useTheme } from "../../context/ThemeContext";
import {
  FineTaskContextProvider,
  useFineTask,
} from "../../context/FineTaskContext";
import { useNotifications } from "../../context/NotificationContext";

export const FineTaskContent = () => {
  // console.log("FinetaskContent Remounted");
  const [open, setOpen] = useState(false);
  const { notifications } = useNotifications();
  const { selectedTask, fineTasks } = useFineTask();

  // console.log("NOTIFICATIONS: ", JSON.stringify(notifications));
  return (
    <main
      className={`finetaskContent grid grid-cols-5 gap-0 h-full w-full p-4`}
    >
      {/* List Section */}
      <div className={`col-span-5 md:col-span-3`}>
        <FineTaskListContent onParentModal={() => setOpen(true)} />
      </div>
      {/* Edit Section */}
      <div className={`hidden md:block md:col-span-2`}>
        <FineTaskEditContent
          fineTaskData={selectedTask}
          tasksEmpty={fineTasks.length === 0}
        />
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onTaskCreated={() => {
          setOpen(false);
        }}
      />
    </main>
  );
};
