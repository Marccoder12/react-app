import { supabase } from "../../../lib/supabase/client";
declare const FlutterwaveCheckout: any;

export const handleLinkCard = async () => {
  console.log("Linking");
  const { data, error } = await supabase.functions.invoke("link-card-init", {
    method: "POST",
  });
  if (error) {
    console.error("Could not start card linking:", error);
    return;
  }

  FlutterwaveCheckout({
    public_key: import.meta.env.VITE_PUBLIC_FLUTTERWAVE_LIVE_API_KEY,
    tx_ref: data.tx_ref,
    amount: 2,
    currency: "NGN",
    payment_options: "card",
    customer: { email: data.email },
    callback: function () {
      // close modal / start polling get-payment-method — no saving here
    },
    onclose: function () {
      // user dismissed without completing
    },
  });
};
