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
import { useFineTask } from "../context/FineTaskContext";
import WalletLoader from "./WalletLoader";
import "../../../mainStyle.css"


export const FineTaskListContent = ({onParentModal}: {onParentModal: () => void}) => {

  const { fetchTasks, fineTasks, loading , handleSelectedFineTask} = useFineTask();
  const [isLoading, setIsLoading] = useState(loading);

  //   useEffect(() => {
  //     fetchTasks();
  // },[]);
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

const ft : FineTask = {
  amount: 1000,
  bank_code: "1323",
  title: "food",
  acc_num: "2948382929",
  bank_name: "Unt",
  due_date: "dpo2i30913i01-2",
  resolved_account_name: "sckmcd",
  id: "dweicwoicwev"
}


    if(loading){
      // {isLoading ? <BookLoader /> : <TaskList tasks={tasks} />}

        return <div className="bg-[#272727] h-full w-full"><WalletLoader/></div>
    }

        // if(fineTasks.length === 0){
        // return (
        //     <div></div>
        //   )
        //     }
          return (
            <div className={`bg-[#272727] shadow p-6 h-full w-full  relative onClick={clearEditTask} `} onClick={() => {handleSelectedFineTask(null)}}>
                {fineTasks.length === 0 ?
                <div className = "relative w-full h-full">
                <div className="relative flex w-full h-full items-center justify-center"><BiWallet className="w-1/3 h-auto text-[#444444]"/>
                <div className="absolute bottom-0 right-15">
                <CreateFineTask openModal={onParentModal} />
                </div>
                </div>
                    </div>
                :
                <div className="relative w-full h-full">
                <ul className=" .no-scrollbar absolute w-14/15 pr-2 h-11/12 overflow-hidden space-y-4">
                  {fineTasks.map((fineTask) => {
                      return(
                          <FineTaskItem
                          key={fineTask.id}
                      currency={`\u20A6`}
                      finetask={fineTask}
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