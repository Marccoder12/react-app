import { FormEvent, useEffect, useState } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";
import { supabase } from "../../../lib/supabase/client";

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
    bank.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative w-full">
      <div
        className="flex items-center gap-2 rounded-xl border gorder-grey 300 bg-white px-4 py-3 focus-witin:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all cursor-text"
        onClick={() => setOpen(true)}
      >
        <span className="text-gray-400">🏦</span>
        <input
          type="text"
          value={selectedBank ? selectedBank.name : query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search bank Name..."
          className="flex-1 bg-transparent outlne-none text-sm placeholder:text-grat-400"
        />
        <span className="text-gray-400 text-xl leading-none">\/</span>
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
};

export default function Modal({ open, onClose }: Props) {
  type FormData = {
    //Stage 1
    title: string;
    price: number | null;
    due_date: string;
    //Stage 2
    bank_code: string;
    bank_name: string;
    acc_num: number | null;
    resolved_account_name: string;
    //Stage 3
    pin: number | null;
    // auto_pay: boolean;
  };

  const initialFormData: FormData = {
    title: "",
    price: null,
    due_date: "",
    bank_code: "",
    bank_name: "",
    acc_num: null,
    resolved_account_name: "",
    pin: null,
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [stage, setStage] = useState<"first" | "second" | "last">("first");

  const [banks, setBanks] = useState<Bank[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanks = async () => {
      const { data, error } = await supabase.functions.invoke("get-banks");
      if (error) console.error("Failed to load banks", error);
      else if (Array.isArray(data)) setBanks(data || []);
    };
    fetchBanks();
  }, []);

  useEffect(() => {
    if (
      stage === "second" &&
      formData.acc_num != null &&
      formData.acc_num.toString().length === 10 &&
      formData.bank_code
    ) {
      const validate = async () => {
        setIsValidating(true);
        setValidationError(null);

        const { data, error } = await supabase.functions.invoke(
          "resolve-account",
          {
            body: {
              account_number: formData.acc_num,
              bank_code: formData.bank_code,
            },
          },
        );

        setIsValidating(false);

        if (error || !data?.account_name) {
          setValidationError("Could not verify account. Please check details");
          setFormData((prev) => ({ ...prev, resolved_account_name: "" }));
        } else {
          setFormData((prev) => ({
            ...prev,
            resolved_account_name: data.account_name,
          }));
        }
      };
      validate();
    }
  }, [formData.acc_num, formData.bank_code, stage]);

  //   useEffect(() => {
  //   getBanks().then(setBanks);
  // }, []);

  // useEffect(() => {
  //   if (open) {
  //     setStage(undefined);
  //   }
  // });

  const clearAllData = () => {
    setFormData({ ...initialFormData });
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
    if (!formData.title && !formData.price) {
      console.log("Fill [TITLE] and [PRICE] fields!");
      return;
    }
    setStage("second");
  };

  const enterSecurityStage = async (e: FormEvent) => {
    e.preventDefault();
    if (
      (!formData.title &&
        (!formData.price ||
          (formData.price !== null && formData.price <= 0))) ||
      formData.acc_num?.toString().length != 10
    ) {
      console.log("Invalid FineTask Details");
      return;
    }
    setStage("last");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (stage == "first") {
      if (formData.price != null && formData.price <= 0)
        console.log(`${formData.price}-Set A valid PRICE for this task`);

      if (
        formData.acc_num != null &&
        (formData.acc_num.toString().length < 10 ||
          formData.acc_num.toString().length > 10)
      ) {
        console.log("not a valid account Number");
        return;
      }

      setStage("second");
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
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Create Task</h2>
          <button
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer transition-colors"
            onClick={() => handleClose()}
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="relative">
          <div className={`bg-stone-200  mt-1 h-0.5 w-[calc(50%-10px)`}></div>
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
          <FiCheckCircle
            className={`absolute left-40 -top-2 
            ${
              stage === "second"
                ? "text-blue-400"
                : stage === "last"
                  ? "text-blue-400"
                  : "text-stone-300"
            } `}
          ></FiCheckCircle>
          <FiCheckCircle
            className={`absolute left-90 -top-2 
            ${stage === "last" ? "text-blue-400" : "text-stone-300"}`}
          ></FiCheckCircle>
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
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              value={formData.title}
              className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <span className="font-bold text-2xl">Price</span>
            <input
              type="number"
              placeholder="Task Price..."
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price:
                    e.target.value === "" ? null : parseFloat(e.target.value),
                }))
              }
              value={formData.price ?? ""}
              className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="border-t-2 border-stone-200"></div>
          <div className="flex justify-center">
            <button
              className="bg-blue-400 p-2 pl-8 pr-8 rounded hover:cursor-pointer  text-white font-bold active:transisition-colors active:bg-blue-500"
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
              <span className="font-bold text-2xl">Account Number</span>
              <input
                type="number"
                placeholder="Recipient Account Number..."
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    acc_num:
                      e.target.value === "" ? null : parseInt(e.target.value),
                  }))
                }
                value={formData.acc_num ?? ""}
                className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <span className="font-bold text-2xl">Bank</span>
              <input
                type="text"
                placeholder="Bank Name..."
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bank_name: e.target.value,
                  }))
                }
                value={formData.bank_name}
                className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="border-t-2 border-stone-200"></div>
            <div className="flex justify-around">
              <button
                className="bg-blue-400 p-2 pl-8 pr-8 rounded hover:cursor-pointer  text-white font-bold active:transisition-colors active:bg-blue-500"
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
          onSubmit={handleSubmit}
        >
          <div>
            <span className="font-bold text-2xl">Account Number</span>
            <input
              type="number"
              placeholder="Pin..."
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pin: e.target.value === "" ? null : parseInt(e.target.value),
                }))
              }
              value={formData.pin ?? ""}
              className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="border-t-2 border-stone-200"></div>
          <div className="flex justify-center">
            <button className="bg-blue-400 p-2 pl-10 pr-10 rounded hover:cursor-pointer items-center text-white font-bold active:transisition-colors active:bg-blue-500">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
