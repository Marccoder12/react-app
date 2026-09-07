import "nigerian-bank-icons/index.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabase/client";
import { useToast } from "../../../context/ToastContext";
import { ChangePinModal, SetPinModal, VerifyOTPModal } from "./PinModal";
import { PiCircleFill } from "react-icons/pi";
export const SettingsContent = () => {
  type BankIcon = {
    code: number;
    logo: string;
  };
  const [logos, setLogos] = useState<BankIcon[]>([]);
  const [hasPin, setHasPin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [pinModelIndex, setPinModalIndex] = useState(0); // 0: closed, 1: set pin, 2: change pin
  const { signOut, user } = useAuth();
  const addToast = useToast();
  useEffect(() => {
    getLogos();
    const checkPinStatus = async () => {
      try {
        if (!user) throw new Error("Not authenticated");

        const { data, error } = await supabase
          .from("profiles")
          .select("hashed_pin")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          setHasPin(null);
          throw error;
        }
        // If pin is null/empty -> no Pin set yet
        const isSet =
          data?.hashed_pin != null ||
          (data?.hashed_pin != "" && data?.hashed_pin.length > 0);
        setHasPin(isSet);

        //You can now enable/disable UI elements based on hasPin
      } catch (error: any) {
        console.error("Failed to check PIN status:", error);
        //addToast
        setHasPin(false); //fallback
      } finally {
        setLoading(false);
      }
    };

    checkPinStatus();
  }, []); //Runs once when entering the settings panel

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
  const handleGenerateOtp = async () => {
    console.log("send otp");
    // const addToast = useToast();
    try {
      const { data, error } = await supabase.functions.invoke(
        "otp-management",
        {
          body: {
            action: "gen_otp",
            otp: null,
          },
        },
      );

      addToast("success", "Check Email to finish verification");
      if (error) throw new Error("error.message");

      // if(data?.)
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  const handleSignOut = async () => {
    await signOut();
    if (!user) addToast("success", "User log Out successfully!");
  };

  if (loading)
    return <div className='p-6 text-white'>Loading security settings...</div>;
  if (hasPin == null) return <div className='p-6'>Error no Network...</div>;
  return (
    <div className='flex flex-col gap-4 p-4'>
      <span className='font-bold text-blue-100 text-3xl'>Settings</span>
      <section
        className={` h-37.5 w-full flex items-center justify-between p-6 pr-11 rounded-3xl ${!hasPin ? "bg-[#0E1D38] border border-blue-400" : "bg-[#3A2A0E] border-2 border-[#EFAC39]"}`}
      >
        <div>
          <h2
            className={`text-xl font-bold
          ${!hasPin ? "text-[#387BED]" : "text-[#EFAC39]"}`}
          >
            PIN Protection
          </h2>
          <p
            className={`text-sm  font-semibold ${!hasPin ? "text-[#5591DB]" : "text-[#E8C96A]"}`}
          >
            {!hasPin
              ? "Your Pin is set. You can change it later(requires verification)"
              : "No Pin set yet. Set one for added security"}
          </p>
        </div>
        {/* Conditional Buttons */}
        {hasPin ? (
          <button
            className='bg-[#50A2FF] hover:cursor-pointer hover:transition-colors hover:bg-[#6aadfa] p-3 rounded-2xl w-30'
            onClick={() => {
              setPinModalIndex(1);
            }}
          >
            <span className='text-xl font-semibold text-[#112574]'>
              Set Pin
            </span>
          </button>
        ) : (
          <button
            className='bg-[#388ae7] hover:cursor-pointer hover:transition-colors hover:bg-[#6aadfa] p-3 rounded-2xl w-32'
            onClick={() => {
              setPinModalIndex(2);
              handleGenerateOtp();
            }}
          >
            <span className='text-xl font-bold text-[#112574] truncate'>
              Change Pin
            </span>
          </button>
        )}
      </section>
      <section className='w-full h-[150px] flex items-center justify-between p-6 rounded-3xl bg-[#262626] border border-[#3A3A3A]'>
        <div className='details bg-[#1f1f1f] w-full p-4 rounded-xl border border-[#3A3A3A] gap-2 flex  items-center justify-between'>
          <div className='flex items-center gap-2 h-full'>
            {/* card linked status */}
            <PiCircleFill className='text-[#3eeb2e]' />
            <h2 className='text-2xl font-bold text-blue-100 h-full'>
              No Card Linked
            </h2>
            {/* <span className='nbi nbi-xx'></span> */}
            <img
              className='h-16 w-16'
              src={
                logos.length > 0
                  ? "https://supermx1.github.io/nigerian-banks-api/" +
                    logos.find((bank) => bank.code === Number("033"))?.logo
                  : ""
              }
            />
          </div>
          <button className='bg-[#50A2FF] text-xl font-bold hover:cursor-pointer hover:transition-colors hover:bg-[#6aadfa] p-3 rounded-2xl w-30 text-[#112574]'>
            Link Card
          </button>
        </div>
      </section>
      <section className='w-full h-[150px] flex items-center justify-between p-6 pr-11 rounded-3xl bg-[#262626] border border-[#3A3A3A]'>
        <div className='text-white'>
          <h1 className='text-xl font-bold'>Session</h1>
          <span className='text-sm font-semibold'>
            Sign out of Finetask on this device.
          </span>
        </div>
        <button
          className='bg-[#50A2FF] p-3 rounded-2xl w-30 hover:cursor-pointer hover:transition-colors hover:bg-[#6aadfa]'
          onClick={handleSignOut}
        >
          <span className='text-xl font-bold text-[#112574]'>Sign Out</span>
        </button>
        {pinModelIndex === 0 && null}
        {pinModelIndex === 1 && (
          <SetPinModal open={true} onClose={() => setPinModalIndex(0)} />
        )}
        {pinModelIndex === 2 && (
          <VerifyOTPModal
            open={true}
            onClose={() => setPinModalIndex(0)}
            onVerified={() => setPinModalIndex(3)}
          />
        )}
        {pinModelIndex === 3 && (
          <ChangePinModal open={true} onClose={() => setPinModalIndex(0)} />
        )}
        {/* <Outlet /> */}
      </section>
    </div>
  );
};
