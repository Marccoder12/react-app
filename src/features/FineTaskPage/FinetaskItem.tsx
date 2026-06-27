import { useEffect } from "react";
import { FineTask } from "../../Utils/types";

export const FineTaskItem = ({finetask, currency, onSelect
}: {
  finetask: FineTask;
  currency: "N" | "$" | string;
  onSelect: (id : string) => void;
}) => {


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
  // console.log(finetask)
  return (
    <div onClick={() => onSelect(finetask.id)} className="flex flex-col transition-all border-white bg-white items-center justify-between bg-white-50 w-full h-32 rounded-2xl shadow shadow-gray-300 hover:bg-stone-50 cursor-pointer hover:border-blue-400 hover:transition-all hover:border-2">
      <div className="bg-blue-200 rounded-t-xl p-4 h-full w-full">
        <h1 className="text-blue-800 font-bold font-sans text-4xl text-ellipsis">
          {finetask.title}
        </h1>
      </div>
      <div className="h-full w-full border-t-4 border-blue-300 rounded-b-2xl flex justify-between">
        <div className="pl-4 w-[50%] border-r-2 border-blue-300">
          <span className="text-3xl font-bold">{currency}</span>
          <span className=" text-3xl font-semibold">{(finetask.amount?.toString() ?? 0).toString()}</span>
        </div>
        <div className=" w-[50%] pr-4 pt-2 relative justify-end overflow-hidden text-ellipsis border-l-2 border-blue-300">
          <span className="absolute text-stone-400 text-2xl font-semibold">
            {setDueDate(finetask.due_date ?? "")}
          </span>
        </div>
      </div>
    </div>
  );
};
