import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_API_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_API_KEY,
);
