import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabase/client";
import { useToast } from "../../../context/ToastContext";
import { ChangePinModal, SetPinModal, VerifyOTPModal } from "./PinModal";
export const SettingsContent = () => {
  const [hasPin, setHasPin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [pinModelIndex, setPinModalIndex] = useState(0); // 0: closed, 1: set pin, 2: change pin
  const { signOut, user } = useAuth();
  const addToast = useToast();
  useEffect(() => {
    const checkPinStatus = async () => {
      try {
        if (!user) throw new Error("Not authenticated");

        const { data, error } = await supabase
          .from("profiles")
          .select("hashed_pin")
          .eq("id", user.id)
          .maybeSingle();

        if (error){
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

  const handleSignOut = async () => {
    await signOut();
    if (!user) addToast("success", "User log Out successfully!");
  };


  if (loading) return <div className="p-6">Loading security settings...</div>;
  if (hasPin == null) return <div className="p-6">Error no Network...</div>;
  return (
    <div className="flex flex-col gap-4 p-4">
      SettingsContent
      <div
        className={` w-8/12 p-4 rounded-xl ${!hasPin ? "bg-blue-200 border-2 border-blue-400" : "bg-yellow-200 border-2 border-yellow-400"}`}
      >
        <h2
          className={`text-xl font-bold
          ${!hasPin ? "text-blue-800" : "text-yellow-800"}`}
        >
          PIN Protection
        </h2>
        <p className="text-sm text-gray-800 font-semibold">
          {!hasPin
            ? "Your Pin is set. You can change it later(requires verification)"
            : "No Pin set yet. Set one for added security"}
        </p>
      </div>
      {/* Conditional Buttons */}
      {!hasPin ? (
        <button
          className="bg-blue-300 hover:cursor-pointer hover:transition-colors hover:bg-blue-400 p-3 rounded w-30"
          onClick={() => {
            setPinModalIndex(1);
          }}
        >
          Set Pin
        </button>
      ) : (
        <button
          className="bg-blue-300 hover:cursor-pointer hover:transition-colors hover:bg-blue-400 p-3 rounded w-30"
          onClick={() => {
            setPinModalIndex(2);
          }}
        >
          Change Pin
        </button>
      )}
      <button
        className="bg-blue-300 p-3 rounded w-30 hover:cursor-pointer hover:transition-colors hover:bg-blue-400"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
      {pinModelIndex === 0 && null}
      {pinModelIndex === 1 && (
        <SetPinModal open={true} onClose={() => setPinModalIndex(0)} />
      )}
      {pinModelIndex === 2 && (
        <VerifyOTPModal open={true} onClose={() => setPinModalIndex(0)} />
      )}
      {pinModelIndex === 3 && (
        <ChangePinModal open={true} onClose={() => setPinModalIndex(0)} />
      )}
      {/* <Outlet /> */}
    </div>
  );
};
