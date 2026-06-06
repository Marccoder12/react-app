import { FormEvent, useEffect, useState, useRef } from "react";
import { FiCheckCircle, FiChevronDown, FiX } from "react-icons/fi";
import { supabase } from "../../../lib/supabase/client";
import { GiBank } from "react-icons/gi";
import { useToast } from "../../../context/ToastContext";
import { FineTask } from "../../../Utils/types";

type Bank = {
  code: string;
  name: string;
};

//Re-usable searchable bank dropdown
const BankSelector = ({
  banks,
  selectedCode,
  onSelect,
}: {
  banks: Bank[];
  selectedCode: string;
  onSelect: (code: string, name: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const selectedBank = banks.find((b) => b.code === selectedCode);
  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(query.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="relative w-full">
      <div
        className="flex items-center gap-2 rounded-xl border gorder-grey 300 bg-white px-4 py-3 focus-witin:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all cursor-text"
        onClick={() => setOpen(true)}
      >
        <span className="text-gray-400">
          <GiBank />
        </span>
        <input
          type="text"
          value={selectedBank ? selectedBank.name : query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSelect("", "");
            if (!open) setOpen(true);
          }}
          onFocus={(e) => {
            setOpen(true);
            setQuery("");
          }}
          placeholder="Search bank Name..."
          className="flex-1 p-1 text-md bg-transparent outlne-none text-sm placeholder:text-grat-400"
        />
        <span className="text-gray-400 text-xl leading-none">
          <FiChevronDown />
        </span>
      </div>
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-gray-200 bg-white shadow-xl max-h-72 overflow-auto py-2">
          {filteredBanks.length === 0 ? (
            <div className="px-4 py-3 text-gray-500 text-sm">
              No banks found
            </div>
          ) : (
            filteredBanks.map((bank) => (
              <div
                key={bank.code}
                onClick={() => {
                  onSelect(bank.code, bank.name);
                  setQuery("");
                  setOpen(false);
                }}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm flex items-center gap-2"
              >
                <span className="text-emerald-400">🏦</span>
                {bank.name}
              </div>
            ))
          )}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </div>
  );
};

type Props = {
  open: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
};

export default function Modal({ open, onClose, onTaskCreated }: Props) {


  const initialFineTask: FineTask = {
    id: "",
    title: "",
    amount: null,
    due_date: "",
    bank_code: "",
    bank_name: "",
    acc_num: null,
    resolved_account_name: "",
    pin: null,
  };

  const [fineTask, setfineTask] = useState<FineTask>(initialFineTask);
  const [stage, setStage] = useState<"first" | "second" | "last">("first");
  const [inputPin, setInputPin] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const addToast = useToast();

  //verifying task creation states
  const [creating, setCreating] = useState(false);



  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      // check the character is entered not / Only digits allowed
      const newPin = [...inputPin];
      newPin[index] = value;
      setInputPin(newPin);

      if (value && index < inputPin.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !inputPin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };


  const handlePinSet = async () => {
    const enteredPin = inputPin.join("");
    try{
      setCreating(true);

      if (enteredPin.length === 4) {
        
        const { data, error } = await supabase.functions.invoke(
          "pin_management",
          {
            body: {
              pin: enteredPin,
              form_data: fineTask,
            },
          },
        );
        if(error){
          throw error;
        }

        if(data.success){
          clearAllData();
          onClose();
        }
      //show success message
      } else {
        // show error message
        addToast("error", "Invalid PIN. Please try again.");
      }
    }finally{
      setCreating(false);
    }
  };
  useEffect(() => {
    const fetchBanks = async () => {
      const { data, error } = await supabase.functions.invoke("get-banks");
      if (error) console.error("Failed to load banks", error);
      setBanks(data || []);
    };
    fetchBanks();
  }, []);

  useEffect(() => {
    if (
      stage === "second" &&
      fineTask.acc_num != null &&
      fineTask.acc_num.toString().length === 10 &&
      fineTask.bank_code
    ) {
      const validate = async () => {
        setIsValidating(true);
        setValidationError(null);

        const { data, error } = await supabase.functions.invoke(
          "resolve-account",
          {
            body: {
              account_number: fineTask.acc_num,
              bank_code: fineTask.bank_code,
            },
          },
        );

        setIsValidating(false);

        if (error || !data?.account_name) {
          setValidationError("Could not verify account. Please check details");
          setfineTask((prev) => ({ ...prev, resolved_account_name: "" }));
        } else {
          setfineTask((prev) => ({
            ...prev,
            resolved_account_name: data.account_name,
          }));
        }
      };
      validate();
    }
  }, [fineTask.acc_num, fineTask.bank_code, stage]);

  //   useEffect(() => {
  //   getBanks().then(setBanks);
  // }, []);

  // useEffect(() => {
  //   if (open) {
  //     setStage(undefined);
  //   }
  // });

  const clearAllData = () => {
    setInputPin(["", "", "", ""]);
    setfineTask({ ...initialFineTask });
    setStage("first");
  };

  const handleClose = () => {
    clearAllData();
    onClose();
  };

  const enterFirstStage = async (e: FormEvent) => {
    e.preventDefault();
    setStage("first");
  };
  const enterAccountStage = async (e: FormEvent) => {

    e.preventDefault();
    
    console.log(fineTask.due_date);
    if (
      fineTask.title.length > 0 &&
      fineTask.amount !== null &&
      fineTask.amount.toString().length > 0
    ) {
      setStage("second");
      return;
    } else {
      addToast("error", "Fill in Title and Price fields");
      return;
    }
  };

  const enterSecurityStage = async (e: FormEvent) => {
    e.preventDefault();
    if (
      (!fineTask.title &&
        (!fineTask.amount ||
          (fineTask.amount !== null && fineTask.amount <= 0))) ||
      fineTask.acc_num?.toString().length != 10
    ) {
      addToast("error", "Invalid Finetask Details");
      return;
    }
    setStage("last");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (stage == "first") {
      if (fineTask.amount != null && fineTask.amount <= 0)
        addToast("error", `${fineTask.amount}-Set a valid price for this task`);

      if (
        fineTask.acc_num != null &&
        (fineTask.acc_num.toString().length < 10 ||
          fineTask.acc_num.toString().length > 10)
      ) {
        setStage("second");
        addToast("error", "not a valid account number");
        return;
      }
    }
  };


  const handleCreateTask = async () => {
    const enteredPin = inputPin.join("");
    try{
      setCreating(true);

      if (enteredPin.length === 4) {
        
        const { data, error } = await supabase.functions.invoke(
          "create-finetask",
          {
            body: {
              pin: enteredPin,
              form_data: fineTask,
            },
          },
        );
        if(error){
          addToast("error", error.message || "Failed to create task");
          return;
        }
        onTaskCreated();
          clearAllData();
          onClose();

      //show success message
      } else {
        // show error message
      }
    }
    catch(error){
      console.error("Error creating task:", error);
    }
    finally{
      setCreating(false);
    }
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all duration-300
      ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* modal box */}
      <div className="relative bg-white rounded-xl z-10 w-96 shadow-lg">
        {/* header */}
        <div className="flex items-center justify-between relative p-6 border-b border-gray-200">
          <div className=" relative pl-30">
            <h2 className="text-lg font-semibold">Create Task</h2>
          </div>
          <div className="justify-self-end">
            <button
              className="text-gray-500 hover:text-gray-700 hover:cursor-pointer transition-colors"
              onClick={() => handleClose()}
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
        <div className="relative">
          <div className={`bg-stone-200 h-0.5 w-[calc(50%-10px)`}></div>
          <div
            className={`
            ${
              stage === "second"
                ? "bg-blue-400 -mt-0.5 h-0.5 w-[calc(45%-10px)]"
                : stage === "last"
                  ? "bg-blue-400 -mt-0.5 h-0.5 w-[calc(100%-10px)]"
                  : "bg-blue-400 -mt-0.5 h-0.5 w-0"
            }`}
          ></div>
          <div
            className={`absolute bg-white left-40 -top-2 
              ${
                stage === "second"
                  ? "text-blue-400"
                  : stage === "last"
                    ? "text-blue-400"
                    : "text-stone-300"
              } `}
          >
            <FiCheckCircle></FiCheckCircle>
          </div>
          <div
            className={`absolute bg-white left-90 -top-2 
              ${stage === "last" ? "text-blue-400" : "text-stone-300"}`}
          >
            <FiCheckCircle></FiCheckCircle>
          </div>
        </div>

        {/* form content */}
        {/* First Stage */}
        <form
          className={`p-6 space-y-4
          ${stage === "first" ? "block" : "hidden"}`}
        >
          {/* Add your form content here */}
          <div>
            <span className="font-bold text-2xl">Title</span>
            <input
              type="text"
              placeholder="Task Title..."
              onChange={(e) =>
                setfineTask((prev) => ({ ...prev, title: e.target.value }))
              }
              value={fineTask.title}
              className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <span className="font-bold text-2xl">Price</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="Task Price..."
              onChange={(e) =>
                setfineTask((prev) => ({
                  ...prev,
                  amount:
                    e.target.value === "" ? null : parseInt(e.target.value),
                }))
              }
              value={fineTask.amount ?? ""}
              className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <span className="font-bold text-2xl">Due Date</span>
            <input
              type="datetime-local"
              placeholder="Task due date..."
              onChange={(e) =>
                setfineTask((prev) => ({
                  ...prev,
                  due_date:
                    e.target.value,
                }))
              }
              value={fineTask.due_date ?? ""}
              className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="border-t-2 border-stone-200"></div>
          <div className="flex justify-center">
            <button
              className="bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 pl-8 pr-8 rounded hover:cursor-pointer  text-white font-bold active:transisition-colors active:bg-blue-500"
              type="button"
              onClick={enterAccountStage}
            >
              Next
            </button>
          </div>
        </form>

        {/* Second Stage */}
        {stage === "second" && (
          <form
            className={`p-6 space-y-4
          ${stage === "second" ? "block" : "hidden"}`}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank
              </label>
              <BankSelector
                banks={banks}
                selectedCode={fineTask.bank_code}
                onSelect={(code, name) => {
                  setfineTask((prev) => ({
                    ...prev,
                    bank_code: code,
                    bank_name: name,
                    resolved_account_name: "",
                  }));
                }}
              />
            </div>
            {/* Account Number + live validation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number (10 digit)
              </label>
              {/* <span className="font-bold text-2xl">Account Number</span> */}
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                value={fineTask.acc_num ?? ""}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setfineTask((prev) => ({
                    ...prev,
                    acc_num: val === "" ? null : val,
                  }));
                }}
                className="w-full rounded-xl border overflow-hidden border-gray-300 px-4 py-3 text-lg tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="00000000"
              />
              {isValidating && (
                <div className="mt-3 text blue-600 text-sm flex items-center gap-2">
                  <span className="animate-spin">
                    <FiCheckCircle />
                  </span>
                  Validating with Flutterwave...
                </div>
              )}

              {fineTask.resolved_account_name && !isValidating && (
                <div className="mt-3 bg-emerald-50 border-emerald-200 rounded-xl px-4 py-3 text-emerald-700 text-sm flex items-center gap-2">
                  Account Name:{" "}
                  <span className="font-semibold">
                    {fineTask.resolved_account_name}
                  </span>
                </div>
              )}
              {validationError && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                  ❌{validationError}
                </div>
              )}
            </div>
            <div className="border-t-2 border-stone-200"></div>
            <div className="flex justify-around">
              <button
                className="bg-blue-400 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8 pr-8 rounded hover:cursor-pointer  text-white font-bold active:transisition-colors active:bg-blue-500"
                onClick={enterFirstStage}
              >
                Back
              </button>
              <button
                className="bg-blue-400 p-2 pl-8 pr-8 rounded hover:cursor-pointer text-white font-bold active:transisition-colors active:bg-blue-500"
                onClick={enterSecurityStage}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {/* Last Stage */}
        <form
          className={`p-6 space-y-4
          ${stage === "last" ? "block" : "hidden"}`}
          onSubmit={handleCreateTask}
        >
          <div className="gap-y-2">
            <span className="font-bold text-gray-800 text-2xl">
              Verify Task
            </span>
            <div
              className="flex flex-col justify-between gap-8"
              onSubmit={handlePinSet}
            >
              <div className="flex justify-around gap-x-2">
                {inputPin.map((digit, index) => (
                  <input
                    type="text"
                    inputMode="numeric"
                    key={index}
                    maxLength={4}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-14  h-14 text-center text-indigo-500 text-lg font-bold bg-transparent border border-blue-800 rounded-lg outline-none focus:border-indigo-500/40 focus:bg-indigo-500/5  transition-all"
                  />
                ))}
              </div>
              {/* <input
              type="number"
              placeholder="Pin..."
              onChange={(e) =>
                setfineTask((prev) => ({
                  ...prev,
                  pin: e.target.value === "" ? null : parseInt(e.target.value),
                }))
              }
              value={fineTask.pin ?? ""}
              className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
            </div>
          </div>
          <div className="border-t-2 border-stone-200"></div>
            <button disabled={creating} type="submit" onClick={handleCreateTask} className="bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 pl-10 pr-10 rounded hover:cursor-pointer items-center text-white font-bold active:transisition-colors active:bg-blue-500">
              {creating ? "Creating..." : "Create Task"}
            </button>
        </form>
      </div>
    </div>
  )
}
