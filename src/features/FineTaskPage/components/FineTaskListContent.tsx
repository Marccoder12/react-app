import { useEffect, useState } from "react";
import { FineTaskItem } from "../FinetaskItem";
import { FineTask } from "../../../Utils/types";
import { CreateFineTask } from "./CreateFineTask";
import { FiBook, FiClock, FiColumns } from "react-icons/fi";
import { BiArea, BiBox, BiWallet } from "react-icons/bi";
import { RxRows } from "react-icons/rx";
import { FaOpencart } from "react-icons/fa";
import { GiOpenBook, GiOpenChest, GiOpenFolder } from "react-icons/gi";
import { useTheme } from "../../../context/ThemeContext";
import { supabase } from "../../../lib/supabase/client";
import { useAuth } from "../../../context/AuthContext";

export const FineTaskListContent = ({finetasks, loading, onParentModal, onFinetaskSelected, clearEditTask}: {finetasks: FineTask[], loading : boolean, onParentModal: () => void, onFinetaskSelected:(id : string) => void, clearEditTask: () => void }) => {

    const { user } = useAuth();
//   const fetchTasks = async () => {
//     loading =true;
//     try{
//       // fetch tasks from backend and update state
//     const { data, error } = await supabase
//     .from("fine_tasks")
//     .select("*")
//     .eq("user_id", user?.id);

//     if (error) {
//       console.error("Error fetching tasks:", error);
//       return;
//     }
    
//     finetasks = data ?? [];
//   }finally{
//     loading = false;
//   }
//   }

  useEffect(() => {

  },[finetasks, loading, onParentModal, onFinetaskSelected, clearEditTask]);

    if(loading){
        return <div>Loading Tasks</div>
    }
    //   if(finetasks.length === 0){
    // return (
    //   <div>No Tasks Yet</div>
    // )
//   }
    return (
              <div className={`bg-white shadow border-2 p-6 border-stone-100 h-full w-full  relative onClick={clearEditTask} `} >
                {finetasks.length === 0 ?
                <div className = "relative w-full h-full">
                <div className="relative flex w-full h-full items-center justify-center"><BiWallet className="w-1/3 h-auto text-stone-200"/>
                <div className="absolute bottom-0 right-15">
                <CreateFineTask openModal={onParentModal} />
                </div>
                </div>
                    </div>
                :
                <div className="relative w-full h-full">
                <ul className="absolute w-14/15 pr-2 h-11/12 overflow-hidden overflow-y-scroll space-y-4">
                  {finetasks.map((finetask) => {
                      return(
        
        
                          <FineTaskItem
                        key={finetask.id}
                      currency={`\u20A6`}
                      finetask={finetask}
                       onSelect={onFinetaskSelected}
                    />
                  )
                })}
                </ul>
                <div className="absolute bottom-0 right-15">
                <CreateFineTask openModal={onParentModal} />
                </div>

                </div>
                    }
              </div>
        
    );
}