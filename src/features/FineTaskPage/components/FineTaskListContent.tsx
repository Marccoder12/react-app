import { useState } from "react";
import { FineTaskItem } from "../FinetaskItem";
import { FineTask } from "../../../Utils/types";
import { CreateFineTask } from "./CreateFineTask";

export const FineTaskListContent = ({finetasks, loading, onParentModal}: {finetasks: FineTask[], loading : boolean, onParentModal: () => void }) => {

    if(loading){
        return <div>Loading Tasks</div>
    }
    //   if(finetasks.length === 0){
    // return (
    //   <div>No Tasks Yet</div>
    // )
//   }
    return (
              <div className="bg-white shadow border-2 p-6 border-stone-100 h-full w-full rounded-xl relative">
                {finetasks.length === 0 ?
                <div className = "relative w-full h-full">
                <div className="relative w-full h-full">No Tasks Yet
                <div className="absolute bottom-0 right-15">
                <CreateFineTask openModal={onParentModal} />
                </div>
                </div>
                    </div>
                :
                <div className="relative w-full h-full">
                <ul className="absolute w-14/15 h-11/12 overflow-hidden overflow-y-scroll space-y-4">
                  {finetasks.map((finetask) => {
                      return(
        
        
                          <FineTaskItem
                      key={finetask.id}
                      currency={`\u20A6`}
                      finetask={finetask}
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