import { EditContent } from "./EditContent";
import { FineTask } from "../../../Utils/types"
import { useEffect, useState } from "react";

export const FineTaskEditContent = ({ tasksEmpty , fineTaskData}: {tasksEmpty: boolean; fineTaskData: FineTask | null; }) => {
  const [fineTask, setFineTask] = useState<FineTask | null>(fineTaskData);  
  useEffect(() => {
    if(fineTaskData){
      setFineTask(fineTaskData);
      console.log("FineTaskEditContent: Selected Task updated", fineTask?.title);
    }
  },[]);
  return (
              <div className="bg-white shadow border-2 border-stone-100 h-full flex-1">
                <EditContent/>
              </div>
    );
}
