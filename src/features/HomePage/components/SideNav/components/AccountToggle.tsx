import { useAuth } from "../../../../../context/AuthContext";
import { supabase } from "../../../../../lib/supabase/client";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
/**
 * AccountToggle component that displays the current user's account information.
 *
 * Renders a button showing the user's avatar, first name, and email address.
 * Uses the `useAuth()` hook to retrieve user data from Supabase authentication.
 *
 * @returns {JSX.Element} A styled account toggle button with user metadata
 *
 * @remarks
 * The user metadata (first_name, email) comes from Supabase Auth's user object.
 * To populate `user_metadata`, you need to set it during user creation or update it
 * via the Supabase Auth Admin API or client API using `updateUser()`.
 * This is separate from your public users table - it's stored in the auth.users table.
 *
 * @example
 * ```tsx
 * <AccountToggle />
 * ```
 */
export default function AccountToggle() {
  const { user } = useAuth();
  // Extract avatar URL with fallbacks

  const displayName =
    user?.user_metadata?.fullName ||
    user?.user_metadata.name ||
    user?.email?.split("@")[0];

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=4f46e5&color=fff&bold=true&size=128`;
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-[#383838ab] rounded transition-colors relative gap-2 w-full items-center">
        <img
          src={avatarUrl}
          alt={displayName || "User"}
          className="size-8 rounded shrink-0 bg-blue-400 shadow"
          referrerPolicy="no-referrer"
        />
        <div className="text-start">
          <span className="text-sm font-semibold block text-gray-200">{displayName}</span>
          <span className="text-xs block text-gray-400">{user?.email}</span>
        </div>

        <CgChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" />
        <CgChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />
      </button>

      {/* <div className="hoverText">
        <p>Hello</p>
      </div> */}
    </div>
  );
}
