import React from "react";
import { FiCalendar, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";
const date = new Date();
export const Topbar = ({ name }: { name: string }) => {
  const { signOut } = useAuth();
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">Good Morning {name}</span>
          <span className="text-xs block text-stone-500">Today is: </span>
        </div>
        {/* <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-blue-700 px-3 py-1.5 rounded">
          <FiCalendar />
          <span>Prev 6 Months</span>
        </button> */}
        {/* <button
          onClick={signOut}
          className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-blue-700 px-3 py-1.5 rounded"
        >
          <FiLogOut />
          <span>Sign Out</span>
        </button> */}
      </div>
    </div>
  );
};
