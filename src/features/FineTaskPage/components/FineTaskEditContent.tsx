import { EditContent } from "./EditContent";
import { FineTask } from "../../../Utils/types"

export const FineTaskEditContent = ({ tasksEmpty , fineTaskData }: {tasksEmpty: boolean; fineTaskData: FineTask | null }) => {
  console.log("enter" + fineTaskData)
    return (
              <div className="bg-white shadow border-2 border-stone-100 h-full flex-1">
                <EditContent fineTask={fineTaskData} isEmpty={tasksEmpty} />
              </div>
    );
}
