import { supabase } from "../../../lib/supabase/client";
import { useAuth } from "../../../context/AuthContext";
import { Topbar } from "./Topbar";
import { MainContent } from "./MainContent";

export default function MainPage() {
  // const { signOut } = useAuth();
  const { user, loading } = useAuth();

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <Topbar
        name={
          user?.user_metadata?.first_name.charAt(0).toUpperCase() +
          user?.user_metadata?.first_name.slice(1).toLowerCase()
        }
      />
      <MainContent></MainContent>
      {/* <button onClick={signOut}>Sign Out</button> */}
    </div>
  );
}
