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

export const FineTaskContent = () => {
  const [finetasks, setFineTasks] = useState<FineTask[]>([]);
  const selectedFinetaskRef = useRef<FineTask | null>(null);
  const [selectedFinetask, setSelectedFinetask] = useState<FineTask | null>(null);
  const [selectedFinetaskId, setSelectedFinetaskId] = useState<string | null>(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [open, setOpen] = useState(false);

  const {user } = useAuth();

  useEffect(() => {
    if(!user?.id) return;

    fetchTasks();
  },[user]);

  const fetchTasks = async () => {
    setLoadingTasks(true);
    try{
      // fetch tasks from backend and update state
    const { data, error } = await supabase
    .from("fine_tasks")
    .select("*")
    .eq("user_id", user?.id);

    if (error) {
      console.error("Error fetching tasks:", error);
      return;
    }
    
    setFineTasks(data ?? []);
  }finally{
    setLoadingTasks(false);
  }
  }

  const handleTaskCreated = () => {
    setOpen(false);

    // refresh task list
    fetchTasks();
  }
  const handleFinetaskSelected = (id: string) => {
    setSelectedFinetaskId(id);    
    console.log(selectedFinetaskId);
    console.log(finetasks);
    const task = finetasks?.find(t => String(t.id.trim()) === String(selectedFinetaskId?.trim()));
        if(task){
          setSelectedFinetask(task);
          console.log(selectedFinetask);
  }
  }

  return (
    <main className="grid grid-cols-5 gap-4 h-full w-full p-4">
      {/* List Section */}
      <div className="col-span-3">
      <FineTaskListContent  onFinetaskSelected={handleFinetaskSelected} finetasks={finetasks} 
      loading={loadingTasks} onParentModal={() => setOpen(true)}
       clearEditTask={() => setSelectedFinetask(null)}/>
      </div>
      {/* Edit Section */}
      <div className="col-span-2">
      <FineTaskEditContent fineTaskData={selectedFinetask} tasksEmpty={(finetasks.length === 0)}/>
      </div>
          <Modal open={open} onClose={() => setOpen(false)} onTaskCreated={handleTaskCreated} />
          

    </main>
  );
}

