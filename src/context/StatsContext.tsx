import { useAuth } from "../context/AuthContext";
import {
  Context,
  useContext,
  Provider,
  useState,
  createContext,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase/client";
import { StatsEntry } from "../Utils/types";

type StatsContextType = {
  statsLoading: boolean;
  stats: StatsEntry[] | null; // Replace 'any' with the actual type of your stats data
  fetchStats: ({ start, end }: { start: Date; end: Date }) => Promise<void>;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsContextProvider = ({ children }: { children: ReactNode }) => {
  const [statsLoading, setStatsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<StatsEntry[] | null>(null); // Replace 'any' with the actual type of your stats data
  const { user } = useAuth();

  const fetchStats = async ({ start, end }: { start: Date; end: Date }) => {
    setStatsLoading(true);
    // Your stats fetching logic here

    if (!user?.id) {
      console.error("User is not authenticated");
      setStatsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .eq("user_id", user.id)
      .gte("created_at", start.toISOString())
      .lte("created_at", end.toISOString())
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching stats:", error);
      setStats([]);
    } else {
      console.log("STATS DATA: ", data);
      // const statsList: StatsEntry[] = (data || []).map((entry) => ({
      //   id: entry.id,
      //   user_id: entry.user_id,
      //   fineTaskId: entry.fineTaskId,
      //   status: entry.status,
      //   fineTask_group: entry.fineTask_group,
      //   created_at: entry.created_at,
      // }));
      setStats(data);
    }

    setStatsLoading(false);
  };

  return (
    <StatsContext.Provider value={{ statsLoading, stats, fetchStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("useStats must be used inside a StatsProvider");
  }
  return context;
};
