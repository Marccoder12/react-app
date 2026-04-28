import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export const CreateFineTask = ({ openModal }: { openModal: () => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <button
      className="bg-blue-400  shadow-stone-500 p-4
        rounded-2xl hover:cursor-pointer
         hover:transition-colors hover:bg-blue-500"
      onClick={openModal}
    >
      <span className="text-white font-bold text-2xl">
        <FiPlus className="size-8"></FiPlus>
      </span>
    </button>
  );
};
