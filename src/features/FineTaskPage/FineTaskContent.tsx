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
import { FineTaskContextProvider, useFineTask } from "./context/FineTaskContext";

export const FineTaskContent = () => {

  // console.log("FinetaskContent Remounted");
  const [finetasks, setFineTasks] = useState<any[]>([]);
  // const selectedFinetaskRef = useRef<FineTask | null>(null);
  // const [selectedFinetaskId, setSelectedFinetaskId] = useState<string | null>(null);
  const [selectedFinetask, setSelectedFinetask] = useState<any | null>(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [open, setOpen] = useState(false);
  const {user } = useAuth();


  // const { handleFineTaskCreated } = useFineTask();

  const handleFinetaskSelected = (id: string) => {
    // setSelectedFinetaskId(id);    
    // console.log("Selected ID: " + id);

    const task = finetasks?.find(t => t.id === id);
        
    // console.log("Found Task", JSON.stringify(task));
    setSelectedFinetask(task);
        // console.log("Task: " + JSON.stringify(task))
      }
      
      useEffect(() => {
        // console.log("Selected Task changed: " + selectedFinetask?.title);
        // console.log(selectedFinetask === task);
  }, [selectedFinetask])

  return (
    <FineTaskContextProvider>

    <main className={`grid grid-cols-5 gap-4 h-full w-full p-4`}>
      {/* List Section */}
      <div className={`col-span-3 `}>
      <FineTaskListContent  
       onParentModal={() => setOpen(true)}/>
      </div>
      {/* Edit Section */}
      <div className={`col-span-2 `}>
      <FineTaskEditContent fineTaskData={selectedFinetask} tasksEmpty={(finetasks.length === 0)}/>
      </div>
          <Modal open={open} onClose={() => setOpen(false)} onTaskCreated={() => {
            setOpen(false);
            // handleFineTaskCreated();
          }} />
          
    </main>
    </FineTaskContextProvider>
  );
}

