import { useState } from "react";
import { FiSave, FiTrash } from "react-icons/fi";
import { InputField } from "../../../components/SmallComps";

export const EditContent = ({
  title,
  isEmpty,
}: {
  title?: string;
  isEmpty?: boolean;
}) => {
  const [fineTask, setFineTask] = useState();
  if (isEmpty) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="w-1/2 flex justify-center">
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
          <button className="absolute bg-red-50 p-3 rounded hover:cursor-pointer transition-colors hover:transition-colors hover:bg-red-300">
            
            <FiTrash/>
          </button>
        <div className="border-b-3 w-full flex justify-center align-center border-stone-200">
          <span className="text-3xl p-2 font-bold text-center">{title}</span>
        </div>
        </div>
        <div className="w-full h-full flex flex-col">
        {/* Contents */}

        <div className="w-full border-2 flex flex-col p-4 border-stone-100 h-12/15 grow-2">
        <div className="flex flex-col gap-y-10">
          <div>
            <span className="text-xl">Title</span>
            <div className="flex relative w-full items-center">
              <input type="text" className="relative w-full border-2 rounded-md border-stone-300 p-1"/>
              <button className="right-2 absolute p-1.5 transition-colors"><FiSave className="text-md hover:text-xl transition-all hover:transition-all"/></button>
            </div>
          </div>
          <div>
            <span className="text-xl">Price</span>
            <div className="flex relative w-full items-center">
              <input type="text" inputMode="numeric" className="relative w-full border-2 rounded-md border-stone-300 p-1"/>
              <button className="right-2 absolute p-1.5 transition-colors"><FiSave className="text-md hover:text-xl transition-all hover:transition-all"/></button>
            </div>
          </div>
          <div>
            <span className="text-xl">Due-Date</span>
            <div className="flex relative w-full items-center">
              <input type="text" className="relative w-full border-2 rounded-md border-stone-300 p-1"/>
              <button className="right-2 absolute p-1.5 transition-colors"><FiSave className="text-md hover:text-xl transition-all hover:transition-all"/></button>
            </div>
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
          <div className="relative w-full h-full flex items-center justify-around"><button className="absolute text-xl bg-red-400 w-45 h-15  transition-all font-bold text-red-100 hover:w-48 hover:h-16 hover:text-lg rounded-md">Delete</button></div>
          <div className="relative w-full h-full flex items-center justify-around"><button className="absolute text-xl bg-blue-400 w-45 h-15 transition-all font-bold text-blue-100 hover:w-48 hover:h-16 hover:text-lg rounded-md">Resolve</button></div>
        </div>
        </div>
      </div>
    );
  }
};
 