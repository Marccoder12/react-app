import { useEffect } from "react";
import { FineTask } from "../../Utils/types";
import { useFineTask } from "./context/FineTaskContext";

export const FineTaskItem = ({finetask, currency
}: {
  finetask: FineTask;
  currency: "N" | "$" | string;
}) => {

  const { selectedTask, handleSelectedFineTask } = useFineTask();


  const setDueDate = (date: Date | string): string => {
    const d = new Date(date);
    const now = new Date();

    const dueDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if(dueDay.getTime() < today.getTime()){
      return "Passed";
    }
    else if(dueDay.getTime() === today.getTime()){
      return d.toLocaleDateString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }); // HH:MM
    }else{

      return d.toLocaleDateString("en-GB"); // dd/mm/yyyy
    }
}
  const formatDate = () => {
    const date = new Date(finetask?.due_date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hr = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hr}:${min} ${ampm} - ${day}/${month}/${year}`;

  }

  useEffect(() => {
    
  },[setDueDate])

    useEffect(() => {
      console.log("EditContent: Selected Task updated", selectedTask?.title);
    },[selectedTask]);
  
  // console.log(finetask)
  return (
    <div onClick={(e) => {
      e.stopPropagation();
      handleSelectedFineTask(finetask)}} className={`flex flex-col transition-all bg-[#727272] items-center justify-between bg-white-50 w-full h-32 rounded-2xl hover:bg-stone-300 cursor-pointer hover:border-blue-400 hover:transition-all hover:border-2 ${selectedTask?.id === finetask.id ? "border-blue-400 border-3" : ""}`}>
      <div className="bg-[#3a4899] hover:bg-[#4f62ca] rounded-t-xl p-4 h-full w-full">
        <h1 className="text-[#dfdfdf] font-bold font-sans text-4xl text-ellipsis">
          {finetask.title}
        </h1>
      </div>
      <div className="h-[calc(100%-4rem)] relative w-full rounded-b-2xl flex justify-between">
        <div className="pl-4 w-[50%] bg-[#616161] hover:bg-[#797979] rounded-bl-2xl">
          <span className="text-3xl relative text-[#424242] font-bold">{currency}</span>
          <span className=" text-3xl font-semibold text-[#a5a5a5]">{(finetask.amount?.toString() ?? 0).toString()}</span>
        </div>
        <div className=" w-[50%] pr-3 pl-2 pt-2 relative justify-end overflow-hidden text-ellipsis">
          <span className="text-stone-400 text-2xl font-semibold">
            {setDueDate(finetask.due_date ?? "")}
          </span>
        </div>
      </div>
    </div>
  );
};
