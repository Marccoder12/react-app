import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabase/client";

export const isPinSet = async (): Promise<boolean> => {
  try {
    const { user } = useAuth();
    if (!user) throw new Error("Not authenticated");
    const { data, error } = await supabase
      .from("profiles")
      .select("hashed_pin")
      .eq("id", user.id)
      .maybeSingle();
    if (error) throw error;
    return (
      data?.hashed_pin != null ||
      (data?.hashed_pin != "" && data?.hashed_pin.length > 0)
    );
  } catch (error: any) {
    console.error("Failed to check PIN status:", error);
    return false; // Assume no PIN if error occurs
  }
};

export const HandleSetPin = async (inputPin: number) => {
  // TODO: Implement pin setup logic
  try {
    const { data, error } = await supabase.functions.invoke("resolve-account", {
      body: {
        action: "set_pin",
        pin: inputPin,
      },
    });
    if (error) throw new Error(error.message);
  } catch (error: any) {
    throw new Error(`Failed to set PIN ${error.message}`);
  }
};
export const HandleChangePin = async () => {};
