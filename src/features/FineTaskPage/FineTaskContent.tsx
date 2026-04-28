import { useState } from "react";
import { ViewOpt } from "../DashBoardPage/components/ViewOpt";
import { CreateFineTask } from "./components/CreateFineTask";
import Modal from "./components/Modal";
import { FineTaskItem } from "./FinetaskItem";
import { BankSelector } from "./components/BankSelector";
import { getBanks } from "./services/getBanks";
import { EditContent } from "./components/EditContent";

export const FineTaskContent = () => {
  const [finetasks, setFineTasks] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    <main className="flex flex-row gap-4 h-full w-full p-4">
      {/* List Section */}
      <div className="bg-white shadow border-2 p-6 border-stone-100 h-full w-4/6 rounded-xl relative">
        <ul className="absolute w-14/15 h-11/12 overflow-hidden overflow-y-scroll space-y-4">
          <FineTaskItem
            currency={`\u20A6`}
            dueDate="12/04/2026"
            price={1200}
            title="Buy Eggs"
            taskId="023031"
          />
          <FineTaskItem
            currency={`\u20A6`}
            dueDate="12/04/2026"
            price={1200}
            title="Buy Eggs"
            taskId="023031"
          />
          <FineTaskItem
            currency={`\u20A6`}
            dueDate="12/04/2026"
            price={1200}
            title="Buy Eggs"
            taskId="023031"
          />
          <FineTaskItem
            currency={`\u20A6`}
            dueDate="12/04/2026"
            price={1200}
            title="Buy Eggs"
            taskId="023031"
          />
          <FineTaskItem
            currency={`\u20A6`}
            dueDate="12/04/2026"
            price={1200}
            title="Buy Eggs"
            taskId="023031"
          />
          <FineTaskItem
            currency={`\u20A6`}
            dueDate="12/04/2026"
            price={1200}
            title="Buy Eggs"
            taskId="023031"
          />
          <FineTaskItem
            currency={`\u20A6`}
            dueDate="12/04/2026"
            price={1200}
            title="Buy Eggs"
            taskId="023031"
          />
          <FineTaskItem
            currency={`\u20A6`}
            dueDate="12/04/2026"
            price={1200}
            title="Buy Eggs"
            taskId="023031"
          />
          <FineTaskItem
            currency={`\u20A6`}
            dueDate="12/04/2026"
            price={1200}
            title="Buy Eggs"
            taskId="023031"
          />
          <FineTaskItem
            currency={`\u20A6`}
            dueDate="12/04/2026"
            price={1200}
            title="Buy Eggs"
            taskId="023031"
          />
          <FineTaskItem
            currency={`\u20A6`}
            dueDate="12/04/2026"
            price={1200}
            title="Buy Eggs"
            taskId="023031"
          />
        </ul>
        <div className="absolute bottom-12 right-12 z-10">
          <CreateFineTask openModal={() => setOpen(true)} />
          <Modal open={open} onClose={() => setOpen(false)} />
          {/* task list
          // {finetasks.map((fine_task) => (
          //   // <FineTaskItem
          //   //   key={fine_task.id}
          //   //   taskId={fine_task.task_id}
          //   //   title={fine_task.title}
          //   //   currency="N"
          //   //   dueDate={fine_task.dueDate}
          //   //   price={fine_task.price}
          //   // />
          // ))} */}
          {/* <BankSelector banks={getBanks} onSelect={()=>{}}/> */}
          {/* <button
            className="bg-blue-400"
            onClick={() => {
              console.log(JSON.stringify(getBanks));
            }}
          >
            {" "}
            GET BANKS
          </button> */}
        </div>
      </div>

      {/* Edit Section */}
      <div className="bg-white shadow border-2 border-stone-100 h-full flex-1 rounded-xl">
        <EditContent title="Buy Eggs" isEmpty={true} />
      </div>
    </main>
  );
};
