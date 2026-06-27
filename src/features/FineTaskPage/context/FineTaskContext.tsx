import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { FineTask } from "../../../Utils/types";
import { supabase } from "../../../lib/supabase/client";
import { useAuth } from "../../../context/AuthContext";

type FineTaskContextType = {
    loading: boolean;
  fineTasks: FineTask[];
  fetchTasks: () => Promise<void>;
  selectedTask: FineTask | null;
  setSelectedTask: Dispatch<SetStateAction<FineTask | null>>;
  
  handleSelectedFineTask: (task: FineTask | null) => void;
  handleFineTaskCreated: () => Promise<void>;
  handleFineTaskDeleted: (task: FineTask) => Promise<void>;
  handleFineTaskUpdated: (id: string, updates: Partial<FineTask>) => Promise<void>;
};

export const FineTaskContext = createContext<FineTaskContextType | undefined>(
  undefined,
);

export const FineTaskContextProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [fineTasks, setFineTasks] = useState<FineTask[]>([]);
    const [selectedTask, setSelectedTask] = useState<FineTask | null>(null);

    const { user } = useAuth();

  useEffect(() => {
    if(!user?.id) return;

    fetchTasks();
  },[user]);
  const fetchTasks = async () => {
            setLoading(true);
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
            setLoading(false);
          }
    }

  const handleSelectedFineTask = (task: FineTask | null) => {
    setSelectedTask(task);
    console.log("TASK: ", task);
  };

  useEffect(() => {
    console.log("FineTaskContext: Selected Task updated", selectedTask?.title);
  },[selectedTask]);

  const handleFineTaskCreated = async () => {
    await fetchTasks();
  }

  const handleFineTaskDeleted = async (task: FineTask) => {
    const { error } = await supabase
      .from("fine_tasks")
      .delete()
      .eq("id", task.id).
      single();

    
    if (error) {
      console.error("Error deleting task:", error);
      return;
    }
    setSelectedTask(null);
    await fetchTasks();
  };

  const handleFineTaskUpdated = async (id: string, updates: Partial<FineTask>) => {
    const { data, error } = await supabase
      .from("fine_tasks")
      .update(updates)
      .eq("id", id)
      .single();

      if(error){
        console.error("Error deleteing task: ", error);
        return;
      }
      const updated = fineTasks.find(t => t.id === id);
      setSelectedTask(updated ?? null);

    await fetchTasks();
  };

  return (
    <FineTaskContext.Provider value={{ loading, fineTasks, fetchTasks, selectedTask, setSelectedTask, handleSelectedFineTask, handleFineTaskDeleted, handleFineTaskUpdated, handleFineTaskCreated }}>
      {children}
    </FineTaskContext.Provider>
  );
};

export const useFineTask = () => {
    const context = useContext(FineTaskContext);
    if(!context){
        throw new Error (
            "useFineTask must be used inside a FineTaskProvider"
        );
    }
    return context;
}
