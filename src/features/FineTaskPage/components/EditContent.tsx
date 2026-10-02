import { useEffect, useRef, useState } from "react";
import { FiSave, FiTrash } from "react-icons/fi";
import { InputField } from "../../../components/SmallComps";
import { FineTask } from "../../../Utils/types";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabase/client";
import { BsQuestion } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { useFineTask } from "../context/FineTaskContext";
import { FTLoader } from "./FTLoader";
import { PiPencil } from "react-icons/pi";

export const EditContent = () => {
  type BankIcon = {
    code: number;
    logo: string;
  };
  const [logos, setLogos] = useState<BankIcon[]>([]);
  const [editContentState, setEditContentState] = useState<boolean>(false);
  useEffect(() => {
    getLogos();
  }, []); //Runs once when entering the settings panel
  // useEffect(() => {}, [editContentState.current]);
  // or with async/await
  async function getLogos() {
    try {
      const response = await fetch(
        "https://supermx1.github.io/nigerian-banks-api/data.json",
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const raw: Array<{ code: string; logo: string }> = await response.json();
      const data: BankIcon[] = raw.map((bank) => ({
        ...bank,
        code: parseInt(bank.code, 10),
      }));
      setLogos(data);
    } catch (error) {
      console.error("Failed to fetch bank logos:", error);
    }
  }
  const {
    selectedTask,
    loading,
    handleFineTaskDeleted,
    handleFineTaskUpdated,
  } = useFineTask();
  useEffect(() => {
    // console.log("EditContent: Selected Task updated", selectedTask?.title);
    setEditFineTask(selectedTask);
  }, [selectedTask]);

  const formatDate = () => {
    const date = new Date(editFineTask?.due_date.slice(0, 16) ?? "");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hr = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hr}:${min} ${ampm} - ${day}/${month}/${year}`;
  };
  const { user } = useAuth();
  const [editFineTask, setEditFineTask] = useState<FineTask | null>(
    selectedTask ?? null,
  );
  if (loading) {
    return <>{/* <FTLoader /> */}</>;
  }

  console.log(JSON.stringify(selectedTask));
  if (!selectedTask) {
    return (
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <div className='relative flex flex-col w-full h-20 items-center justify-center'>
          {/* <BiPencil className="absolute w-2/3 h-auto text-stone-200"/> */}
          <span className='text-[#505050] text-2xl font-semibold text-center'>
            No Finetask Selected!
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className='h-full w-full flex flex-col p-4'>
        <div className='relative flex justify-end'>
          <button
            className={`absolute  text-[#ccc] p-3 rounded hover:cursor-pointer transition-colors hover:transition-colors  ${editContentState === false ? "bg-[#3d60ac33] hover:bg-[#1d366d33]" : "bg-none hover:bg-[#1d366d33]"}`}
            onClick={() => {
              setEditContentState(!editContentState);
            }}
          >
            <PiPencil />
          </button>
          <div className='w-full flex justify-center align-center'>
            <span className='text-3xl p-2 font-bold text-center text-[#cecece]'>
              {selectedTask?.title}
            </span>
          </div>
        </div>
        <div className='w-full h-full flex flex-col'>
          {/* Contents */}

          <div className='w-full  flex flex-col p-4  bg-[#1a1a1a] h-12/15 grow-2'>
            <div className='flex flex-col gap-y-10'>
              <div>
                <span className='text-xl text-[#cecece]'>Title</span>
                <div className='flex relative w-full items-center'>
                  <input
                    placeholder={selectedTask?.title}
                    onChange={(e) => {
                      setEditFineTask(
                        editFineTask
                          ? { ...editFineTask, title: e.target.value }
                          : null,
                      );
                    }}
                    type='text'
                    className='relative w-full border pt-4 pb-4 pl-3 rounded-md border-[#dddddd28] text-[#cecece]'
                  />
                  <button
                    className='right-2 absolute p-1.5 text-[#cecece] transition-colors'
                    onClick={() =>
                      handleFineTaskUpdated(selectedTask?.id, {
                        title: editFineTask?.title,
                      })
                    }
                  >
                    <FiSave className='text-md hover:text-xl transition-all hover:transition-all' />
                  </button>
                </div>
              </div>
              <div>
                <span className='text-xl text-[#cecece]'>Price</span>
                <div className='flex relative w-full items-center'>
                  <input
                    placeholder={selectedTask?.amount?.toString()}
                    onChange={(e) => {
                      setEditFineTask(
                        editFineTask
                          ? {
                              ...editFineTask,
                              amount: parseFloat(e.target.value) || 0,
                            }
                          : null,
                      );
                    }}
                    type='text'
                    inputMode='numeric'
                    className='relative w-full border pt-4 pb-4 pl-3 rounded-md border-[#dddddd28] text-[#cecece]'
                  />
                  <button
                    className='right-2 absolute p-1.5 text-[#cecece] transition-colors'
                    onClick={() =>
                      handleFineTaskUpdated(selectedTask?.id, {
                        amount: editFineTask?.amount,
                      })
                    }
                  >
                    <FiSave className='text-md hover:text-xl transition-all hover:transition-all' />
                  </button>
                </div>
              </div>
              <div>
                <span className='text-xl text-[#cecece]'>Due-Date</span>
                <div className='flex relative w-full items-center'>
                  <input
                    value={selectedTask?.due_date.slice(0, 16)}
                    onChange={(e) => {
                      setEditFineTask((prev) =>
                        prev
                          ? {
                              ...prev,
                              due_date:
                                e.target.value === "" ? "" : e.target.value,
                            }
                          : null,
                      );
                    }}
                    type='datetime-local'
                    className='relative w-full border pt-4 pb-4 pl-3 pr-[7%] rounded-md border-[#dddddd28] text-[#cecece] [&::-webkit-calendar-picker-indicator]:invert
    [&::-webkit-calendar-picker-indicator]:opacity-70
    [&::-webkit-calendar-picker-indicator]:hover:opacity-100"'
                  />
                  <button
                    className='right-2 absolute p-1.5 transition-colors text-[#cecece]'
                    onClick={() =>
                      handleFineTaskUpdated(selectedTask?.id, {
                        due_date: editFineTask?.due_date,
                      })
                    }
                  >
                    <FiSave className='text-md hover:text-xl transition-all hover:transition-all' />
                  </button>
                </div>
                {/* <span className="font_semibold text-black" >Old Value: {formatDate()}</span> */}
                {/* <p>{fineTask?.due_date}</p> */}
              </div>
              <div className='bg-[#d8d8d804] p-2 rounded-sm border border-[#d8d8d815]'>
                <span className='text-xl border-b text-[#ccc] border-stone-200'>
                  {/* United Bank of Africa */}
                  <img
                    className='h-14 w-[1fr] bg-cover'
                    src={
                      logos.length > 0
                        ? "https://supermx1.github.io/nigerian-banks-api/" +
                          logos.find((bank) => bank.code === Number("011"))
                            ?.logo
                        : ""
                    }
                  />
                </span>
                <div className='flex flex-col relative w-[1fr] overflow-hidden flex-wrap'>
                  <span className='text-xl text-[#cccccc7c] font-mono pl-5'>
                    {selectedTask?.acc_num}
                  </span>
                  <span className='text-xl text-[#cccccce0] font-sans-serif'>
                    {/* {selectedTask?.id} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* buttons */}
          <div className=' w-full relative h-2/15 grow flex items-center justify-around'>
            <div className='relative w-full h-full flex items-center justify-around'>
              <button
                className='absolute text-xl bg-red-500 w-45 h-15  transition-all font-bold text-red-100 hover:w-48 hover:h-16 hover:text-lg rounded-md'
                onClick={() => handleFineTaskDeleted(selectedTask)}
              >
                Delete
              </button>
            </div>
            <div className='relative w-full h-full flex items-center justify-around'>
              {editContentState === false ? (
                <button className='absolute text-xl bg-blue-500 w-45 h-15 transition-all font-bold text-blue-100 hover:w-48 hover:h-16 hover:text-lg rounded-md'>
                  Save
                </button>
              ) : (
                <button className='absolute text-xl bg-blue-500 w-45 h-15 transition-all font-bold text-blue-100 hover:w-48 hover:h-16 hover:text-lg rounded-md'>
                  Resolve
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
