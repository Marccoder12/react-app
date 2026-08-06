import { FormEvent, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { useToast } from "../../../context/ToastContext";
import { supabase } from "../../../lib/supabase/client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SetPinModal = ({ open, onClose }: Props) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const addToast = useToast();

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      // check the character is entered not / Only digits allowed
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < pin.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePinSet = async (e: FormEvent) => {
    e.preventDefault();
    const enteredPin = pin.join("");
    try {
      if (enteredPin.length === 4) {
        //show success message

        const { data, error } = await supabase.functions.invoke(
          "pin_management",
          {
            body: {
              action: "SET",
              pin: enteredPin,
            },
          },
        );

        if (error) throw new Error("error.message");
        addToast("success", "Pin set successfully!");
      } else {
        // show error message
        addToast("error", "Please enter a 4-digit pin.");
      }
    } catch (error: any) {
      addToast("error", "Failed to set pin: " + error.message);
    }
  };
  const handleClose = () => {
    onClose();
    setPin(["", "", "", ""]); // Reset pin on close
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
        {/* Header */}
        <div className="flex items-center justify-between relative p-2 border-b border-gray-200">
          <div className="pl-10 flex justify-center">
            <h2 className="text-lg font-bold">Set Pin</h2>
          </div>
          <div className="justify-self-end pr-2">
            <button
              className="text-gray-500 hover:text-gray-700 hover:cursor-pointer transition-colors hover:bg-gray-100 rounded-2xl"
              onClick={() => handleClose()}
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <span className="block text-lg font-medium text-gray-700 mb-2">
            Enter Pin...
          </span>
          <form
            className="flex flex-col justify-between gap-8"
            onSubmit={handlePinSet}
          >
            <div className="flex justify-around gap-x-2">
              {pin.map((digit, index) => (
                <input
                  type="text"
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
            <button
              type="submit"
              className="bg-blue-500  py-4 font-bold text-white rounded-xl focus:outline-blue-800 hover:transition-all hover:bg-blue-600 hover:cursor-pointer"
            >
              Enter
            </button>
          </form>
          {/* <input
            type="text"
            placeholder="enter pin here..."
            className="w-full rounded-xl border-b-2 space-tex overflow-hidden border-gray-300 px-4 py-2 text-lg tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
          <button className="px-4 py-2 bg-blue-400">Set</button> */}
        </div>
      </div>
    </div>
  );
};
export const VerifyOTPModal = ({ open, onClose, onVerified }: Props & { onVerified: () => void;}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const addToast = useToast();

  const handleDigitChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      // Only digits allowed
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    try{

      if (enteredOtp.length === 6) {
        // show success message
        const { data, error } = await supabase.functions.invoke(
          "otp-management",
          {
            body: {
              action: "ver_otp",
              otp: enteredOtp,
            },
          },
        );

        if (error) throw new Error("error.message");

        if(!data.success){
          addToast("error", data.messae);
        }
        else{
           onVerified();
        }
        } else {
          // show error message
          addToast("error", "Please enter a 4-digit pin.");
        }
      }catch(err){

      }
  };

  const handleClose = () => {
    onClose();
    setOtp(["", "", "", "", "", ""]); // Reset OTP on close
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
        {/* Header */}
        <div className="flex items-center justify-between relative p-2 border-b border-gray-200">
          <div className="flex justify-center">
            <h2 className="text-lg font-bold">Verify OTP</h2>
          </div>
          <div className="justify-self-end">
            <button
              className="text-gray-500 hover:text-gray-700 hover:cursor-pointer transition-colors hover:bg-gray-100 rounded-2xl"
              onClick={() => handleClose()}
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <span className="block text-lg font-medium text-gray-700 mb-2">
            Enter OTP...
          </span>
          <form
            className="flex flex-col justify-between gap-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyOtp();
            }}
          >
            <div className="flex px-4 w-full justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  type="text"
                  key={index}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12  h-12 text-center text-indigo-500 text-lg font-bold bg-transparent border border-blue-800 rounded-lg outline-none focus:border-indigo-500/40 focus:bg-indigo-500/5  transition-all"
                />
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-500  py-4 font-bold text-white rounded-xl focus:outline-blue-800 hover:transition-all hover:bg-blue-600 hover:cursor-pointer"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export const ChangePinModal = ({ open, onClose }: Props) => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const addToast = useToast();

  const handlePinChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pin || !confirmPin) {
      addToast("error", "Both fields must be filled");
      return;
    }
    if (pin.length !== 4 || confirmPin.length !== 4) {
      addToast("error", "Your Pin must be set to 4 characters");
      return;
    }
    if (pin !== confirmPin) {
      addToast("error", "Pins do not match");
      return;
    }

    const { error } = await supabase.functions.invoke("pinManagement", {
      body: {
        action: "change",
        pin: pin,
      },
    });

    if (error) {
      addToast("error", "Failed to update pin");
    } else {
      addToast("success", "Pin updated successfully");
      handleClose();
    }
  };
  const handleClose = () => {
    onClose();
    setPin(""); // Reset pin on close
    setConfirmPin(""); // Reset confirm pin on close
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
        {/* Header */}
        <div className="flex items-center justify-between relative p-2 border-b border-gray-200">
          <div className="flex justify-center">
            <h2 className="text-lg font-bold">Change Pin</h2>
          </div>
          <div className="justify-self-end">
            <button
              className="text-gray-500 hover:text-gray-700 hover:cursor-pointer transition-colors hover:bg-gray-100 rounded-2xl"
              onClick={() => handleClose()}
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <span className="block text-lg font-medium text-gray-700 mb-2">
            Enter Pin...
          </span>
          <div
            className="flex flex-col justify-between gap-8"
            onSubmit={handlePinChange}
          >
            <input
              type="text"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-40 px-2 h-10 text-blue-500 text-lg font-bold bg-transparent border border-blue-800 rounded-lg outline-none focus:border-blue-500/40 focus:bg-blue-500/5  transition-all"
            />
            <input
              type="text"
              maxLength={4}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              className="w-40  h-10 px-2 text-blue-500 text-lg font-bold bg-transparent border border-blue-800 rounded-lg outline-none focus:border-blue-500/40 focus:bg-blue-500/5  transition-all"
            />
            <button
              type="submit"
              className="bg-blue-500 px-2 py-4 font-bold text-white rounded-xl focus:outline-blue-800 hover:transition-all hover:bg-blue-600 hover:cursor-pointer"
            >
              Enter
            </button>
          </div>
          {/* <input
            type="text"
            placeholder="enter pin here..."
            className="w-full rounded-xl border-b-2 space-tex overflow-hidden border-gray-300 px-4 py-2 text-lg tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
          <button className="px-4 py-2 bg-blue-400">Set</button> */}
        </div>
      </div>
    </div>
  );
};
