import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";

export const UserPageContent = () => {
  const { user, signOut } = useAuth();
  return (
    <main className="bg-blue-400 w-full h-full p-4">
      <button
        onClick={signOut}
        className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-blue-700 px-3 py-1.5 rounded"
      >
        <FiLogOut />
        <span>Sign Out</span>
      </button>
    </main>
  );
};
