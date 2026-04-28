import { useState } from "react";

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
        <div className="border-b-3 w-full flex justify-center align-center border-stone-200">
          <span className="text-3xl p-2 font-bold text-center">{title}</span>
        </div>
      </div>
    );
  }
};
