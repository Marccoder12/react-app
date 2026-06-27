import { EditContent } from "./EditContent";
import { FineTask } from "../../../Utils/types"
import { useEffect, useState } from "react";

export const FineTaskEditContent = ({ tasksEmpty , fineTaskData , onEditChanged }: {tasksEmpty: boolean; fineTaskData: FineTask | null; onEditChanged: (finetask: FineTask | null) => void }) => {
  const [fineTask, setFineTask] = useState<FineTask | null>(fineTaskData);  
  useEffect(() => {
    if(fineTaskData){
      setFineTask(fineTaskData);
      console.log("FineTaskEditContent: Selected Task updated", fineTask?.title);
    }
  },[]);
  return (
              <div className="bg-white shadow border-2 border-stone-100 h-full flex-1">
                <EditContent fineTask={fineTaskData} isEmpty={tasksEmpty} onChanged={onEditChanged}/>
              </div>
    );
}
