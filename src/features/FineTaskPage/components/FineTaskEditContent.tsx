import { EditContent } from "./EditContent";
import { FineTask } from "../../../Utils/types";
import { useEffect, useState } from "react";
import { useFineTask } from "../context/FineTaskContext";

export const FineTaskEditContent = ({
  tasksEmpty,
  fineTaskData,
}: {
  tasksEmpty: boolean;
  fineTaskData: FineTask | null;
}) => {
  const [fineTask, setFineTask] = useState<FineTask | null>(fineTaskData);
  useEffect(() => {
    if (fineTaskData) {
      setFineTask(fineTaskData);
      console.log(
        "FineTaskEditContent: Selected Task updated",
        fineTask?.title,
      );
    }
  }, []);
  return (
    <div className='bg-[#141414] shadow border-l border-l-[#3b3b3b98] h-full flex-1'>
      <EditContent />
    </div>
  );
};
