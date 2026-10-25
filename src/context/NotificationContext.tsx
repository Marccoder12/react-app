import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase/client";
import { useAuth } from "./AuthContext";
import { AppNotification } from "../Utils/types";

type NotificationContextType = {
  loading: boolean;
  notifications: AppNotification[];
  unreadCount: number;
  markNotified: (ids: string[]) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllRead: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return;
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching notifications:", error);
    } else {
      setNotifications(data ?? []);
    }
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    // 1. Catch up on anything that arrived while the user was away
    fetchNotifications();

    // 2. Listen for new ones while the app is open
    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const incoming = payload.new as AppNotification;
          setNotifications((prev) =>
            prev.some((n) => n.id === incoming.id) ? prev : [incoming, ...prev],
          );
        },
      )
      .subscribe();

    // 3. Re-sync when the tab becomes visible again (covers dropped sockets)
    const handleVisibility = () => {
      if (document.visibilityState === "visible") fetchNotifications();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      supabase.removeChannel(channel);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [user?.id, fetchNotifications]);

  const markNotified = async (ids: string[]) => {
    if (ids.length === 0) return;
    const now = new Date().toISOString();
    setNotifications((prev) =>
      prev.map((n) => (ids.includes(n.id) ? { ...n, notified_at: now } : n)),
    );
    const { error } = await supabase
      .from("notifications")
      .update({ notified_at: now })
      .in("id", ids);
    if (error) console.error("Error marking notified:", error);
  };

  const markAsRead = async (id: string) => {
    const now = new Date().toISOString();
    // optimistic update
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read_at: now } : n)),
    );
    const { error } = await supabase
      .from("notifications")
      .update({ read_at: now })
      .eq("id", id);
    if (error) {
      console.error("Error marking as read:", error);
      fetchNotifications(); // roll back to server truth
    }
  };

  const markAllRead = async () => {
    if (!user?.id) return;
    const now = new Date().toISOString();
    setNotifications((prev) =>
      prev.map((n) => (n.read_at ? n : { ...n, read_at: now })),
    );
    const { error } = await supabase
      .from("notifications")
      .update({ read_at: now })
      .eq("user_id", user.id)
      .is("read_at", null);
    if (error) {
      console.error("Error marking all as read:", error);
      fetchNotifications();
    }
  };

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <NotificationContext.Provider
      value={{
        loading,
        notifications,
        unreadCount,
        markNotified,
        markAsRead,
        markAllRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used inside a NotificationContextProvider",
    );
  }
  return context;
};
