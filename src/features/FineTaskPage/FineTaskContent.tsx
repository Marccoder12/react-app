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
} from "./context/FineTaskContext";

export const FineTaskContent = () => {
  // console.log("FinetaskContent Remounted");
  const [finetasks, setFineTasks] = useState<any[]>([]);
  const [selectedFinetask, setSelectedFinetask] = useState<any | null>(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <FineTaskContextProvider>
      <main
        className={`finetaskContent grid grid-cols-5 gap-0 h-full w-full p-4`}
      >
        {/* List Section */}
        <div className={`col-span-3 `}>
          <FineTaskListContent onParentModal={() => setOpen(true)} />
        </div>
        {/* Edit Section */}
        <div className={`col-span-2 `}>
          <FineTaskEditContent
            fineTaskData={selectedFinetask}
            tasksEmpty={finetasks.length === 0}
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
    </FineTaskContextProvider>
  );
};
