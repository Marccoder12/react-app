import { useEffect, useState } from "react";
import { FiSave, FiTrash } from "react-icons/fi";
import { InputField } from "../../../components/SmallComps";
import { FineTask } from "../../../Utils/types";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabase/client";
import { BsQuestion } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";

export const EditContent = ({
  fineTask,
  isEmpty,
  onChanged,
}: {
  fineTask?: FineTask | null;
  isEmpty?: boolean;
  onChanged?: (updatedFineTask: FineTask) => void;
}) => {

  // states
  const [dateTime, setDateTime] = useState<string | null>(null);
  
  // effects
    useEffect(() =>{
      setEditFineTask(fineTask ?? null);
      console.log("EditContent: Edit FineTask updated", editFineTask?.title);
    },[fineTask]);
    // useEffect(() => {
    //   if(!editFineTask) return;
    //   setDateTime(editFineTask?.due_date.slice(11, 16) ?? null);
    // },[fineTask])

    const  toDateTimeLocalValue =  (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    return '';
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}- ${month}-${day}T${hours}:${minutes}`;
}

  const formatDate = () => {
    const date = new Date(editFineTask?.due_date.slice(0, 16) ?? "");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hr = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hr}:${min} ${ampm} - ${day}/${month}/${year}`;
  }
  const {user} = useAuth();
  const [editFineTask, setEditFineTask] = useState<FineTask | null>(null);



const handleDeleteFineTask = async (id : string) => {
    try{
      console.log(fineTask?.id);
                  // fetch tasks from backend and update state
      const { data, error } = await supabase
      .from("fine_tasks")
      .delete()
      .eq("user_id", user?.id)
      .eq("id", id)
      .single();
      
      if (error) {
        console.error("Error fetching tasks:", error);
        return;
      }
      }catch(err){
  }

}

   if (isEmpty) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="relative flex flex-col w-full h-20 items-center justify-center">
           {/* <BiPencil className="absolute w-2/3 h-auto text-stone-200"/> */}
          <span className="text-stone-300 text-2xl font-semibold text-center">
            No Finetask Selected!
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full flex flex-col p-4">
        <div className="relative flex justify-end">
          <button className="absolute bg-red-50 p-3 rounded hover:cursor-pointer transition-colors hover:transition-colors hover:bg-red-300" onClick={() => handleDeleteFineTask}>
            
            <FiTrash/>
          </button>
        <div className="border-b-3 w-full flex justify-center align-center border-stone-200">
          <span className="text-3xl p-2 font-bold text-center">{editFineTask?.title}</span>
        </div>
        </div>
        <div className="w-full h-full flex flex-col">
        {/* Contents */}

        <div className="w-full border-2 flex flex-col p-4 border-stone-100 h-12/15 grow-2">
        <div className="flex flex-col gap-y-10">
          <div>
            <span className="text-xl">Title</span>
            <div className="flex relative w-full items-center">
              <input placeholder={editFineTask?.title} type="text" className="relative w-full border-2 rounded-md border-stone-300 p-1"/>
              <button className="right-2 absolute p-1.5 transition-colors" onClick={() => editFineTask && onChanged?.(editFineTask)}><FiSave className="text-md hover:text-xl transition-all hover:transition-all"/></button>
            </div>
          </div>
          <div>
            <span className="text-xl">Price</span>
            <div className="flex relative w-full items-center">
              <input placeholder={editFineTask?.amount?.toString()} type="text" inputMode="numeric" className="relative w-full border-2 rounded-md border-stone-300 p-1"/>
              <button className="right-2 absolute p-1.5 transition-colors" onClick={() => editFineTask && onChanged?.(editFineTask)}><FiSave className="text-md hover:text-xl transition-all hover:transition-all"/></button>
            </div>
          </div>
          <div>
            <span className="text-xl">Due-Date</span>
            <div className="flex relative w-full items-center">
              <input value={editFineTask?.due_date.slice(0, 16)} onChange={(e)=> {
                setEditFineTask((prev) => prev ? { ...prev, due_date: e.target.value === "" ? "" : e.target.value} : null)
              }}  type="datetime-local" className=" pr-10 relative w-full border-2 rounded-md border-stone-300 p-1"/>
              <button className="right-2 absolute p-1.5 transition-colors" onClick={() => editFineTask && onChanged?.(editFineTask)}><FiSave className="text-md hover:text-xl transition-all hover:transition-all"/></button>
            </div>
            <span className="font_semibold text-black" >Old Value: {formatDate()}</span>
            {/* <p>{fineTask?.due_date}</p> */}
          </div>
          <div className="bg-stone-100 p-2 rounded-lg">
            <span className="text-xl border-b-2 border-stone-200">United Bank of Africa</span>
            <div className="flex flex-col relative w-full">
            <span className="text-xl">MARK NGUH EBONKIMUYAM</span>
            <span className="text-xl">8068589545</span>
            </div>
          </div>
        </div>
        </div>
        {/* buttons */}
        <div className=" w-full relative h-2/15 grow flex items-center justify-around">
          <div className="relative w-full h-full flex items-center justify-around"><button className="absolute text-xl bg-red-400 w-45 h-15  transition-all font-bold text-red-100 hover:w-48 hover:h-16 hover:text-lg rounded-md" onClick={() => handleDeleteFineTask(fineTask?.id ?? "")}>Delete</button></div>
          <div className="relative w-full h-full flex items-center justify-around"><button className="absolute text-xl bg-blue-400 w-45 h-15 transition-all font-bold text-blue-100 hover:w-48 hover:h-16 hover:text-lg rounded-md">Resolve</button></div>
        </div>
        </div>
      </div>
    );
  }
};
 