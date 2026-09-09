import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // True only while OUR signOut() is running. Used to tell an intentional
  // logout apart from a SIGNED_OUT event caused by a failed background
  // token refresh (e.g. network dropped for a moment).
  const isSigningOutRef = useRef(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (event === "SIGNED_OUT") {
          if (isSigningOutRef.current) {
            // Real, user-initiated sign-out. Trust it immediately.
            isSigningOutRef.current = false;
            setSession(null);
            setUser(null);
            navigate("/auth/login");
            return;
          }

          // Unexpected SIGNED_OUT (e.g. refresh failed while offline).
          // Don't trust it yet — verify with a fresh check. If we're
          // offline right now, don't even try; just keep the last known
          // session and let the next reconnect settle it.
          if (!navigator.onLine) {
            return;
          }

          const { data, error } = await supabase.auth.getSession();
          if (!error && data.session) {
            // Session is actually still valid — the SIGNED_OUT event
            // was a false alarm from a transient refresh failure.
            setSession(data.session);
            setUser(data.session.user);
            return;
          }

          // Genuinely no session left. Now it's safe to redirect.
          setSession(null);
          setUser(null);
          navigate("/auth/login");
          return;
        }

        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);

        if (
          event === "SIGNED_IN" &&
          window.location.pathname === "/auth/login"
        ) {
          navigate("/home/dashboard/finetasks");
        }
      },
    );

    // When we come back online, proactively refresh instead of waiting
    // for the SDK's own timer, so a long offline stretch resolves fast.
    const handleOnline = () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
      });
    };
    window.addEventListener("online", handleOnline);

    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener("online", handleOnline);
    };
  }, [navigate]);

  const signOut = async () => {
    isSigningOutRef.current = true;
    await supabase.auth.signOut();
    // Listener above handles the redirect.
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
