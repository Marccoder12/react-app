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
              <div className="bg-[#272727] shadow  h-full flex-1">
                <EditContent/>
              </div>
    );
}
