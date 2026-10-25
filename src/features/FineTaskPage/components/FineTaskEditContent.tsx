import { EditContent } from "./EditContent";
import { FineTask } from "../../../Utils/types";
import { useEffect, useState } from "react";
import { useFineTask } from "../../../context/FineTaskContext";

export const FineTaskEditContent = ({
  tasksEmpty,
  fineTaskData,
}: {
  tasksEmpty: boolean;
  fineTaskData: FineTask | null;
}) => {
  const [fineTask, setFineTask] = useState<FineTask | null>(fineTaskData);
  const { handleSelectedFineTask } = useFineTask();

  useEffect(() => {
    if (fineTaskData) {
      setFineTask(fineTaskData);
      console.log(
        "FineTaskEditContent: Selected Task updated",
        fineTask?.title,
      );
    }
  }, [fineTaskData]);

  const closeMobileModal = () => {
    handleSelectedFineTask(null);
    setFineTask(null);
  };

  return (
    <>
      <div className='hidden bg-[#141414] shadow border-l border-l-[#3b3b3b98] h-full flex-1 md:flex md:static'>
        <EditContent />
      </div>

      {fineTask && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 md:hidden'
          onClick={closeMobileModal}
        >
          <div
            className='relative h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl border border-[#3b3b3b98] bg-[#141414] shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <EditContent />
          </div>
        </div>
      )}
    </>
  );
};
