import { useState } from "react";
import { FineTaskItem } from "../FinetaskItem";
import { FineTask } from "../../../Utils/types";
import { CreateFineTask } from "./CreateFineTask";
import { FiBook, FiColumns } from "react-icons/fi";
import { BiArea } from "react-icons/bi";
import { RxRows } from "react-icons/rx";

export const FineTaskListContent = ({finetasks, loading, onParentModal, onFinetaskSelected, clearEditTask}: {finetasks: FineTask[], loading : boolean, onParentModal: () => void, onFinetaskSelected:(id : string) => void, clearEditTask: () => void }) => {
    if(loading){
        return <div>Loading Tasks</div>
    }
    //   if(finetasks.length === 0){
    // return (
    //   <div>No Tasks Yet</div>
    // )
//   }
    return (
              <div className="bg-white shadow border-2 p-6 border-stone-100 h-full w-full  relative" onClick={clearEditTask}>
                {finetasks.length === 0 ?
                <div className = "relative w-full h-full">
                <div className="relative flex w-full h-full items-center justify-center"><RxRows className="w-1/3 h-auto text-stone-200"/>
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