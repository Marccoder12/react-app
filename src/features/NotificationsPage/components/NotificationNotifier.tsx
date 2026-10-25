import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../../context/NotificationContext";
import { useToast } from "../../../context/ToastContext";

const MAX_INDIVIDUAL = 3; // if more than this arrive at once, show one summary

export const NotificationNotifier = () => {
  const { notifications, markAsRead, markNotified } = useNotifications();
  const addToast = useToast();
  const navigate = useNavigate();
  const handled = useRef(new Set<string>()); // guards against double-firing

  useEffect(() => {
    const fresh = notifications.filter(
      (n) => !n.notified_at && !handled.current.has(n.id),
    );
    if (fresh.length === 0) return;
    fresh.forEach((n) => handled.current.add(n.id));

    const canSystem =
      "Notification" in window && Notification.permission === "granted";

    const show = (
      title: string,
      body: string,
      tag: string,
      onClick: () => void,
    ) => {
      if (canSystem) {
        try {
          const sys = new Notification(title, { body, tag });
          sys.onclick = () => {
            window.focus();
            onClick();
            sys.close();
          };
          return;
        } catch {
          // some mobile browsers throw here, fall through to the toast
        }
      }
      addToast("info", `${title}: ${body}`);
    };

    if (fresh.length > MAX_INDIVIDUAL) {
      show(
        "Finetask",
        `You have ${fresh.length} new notifications`,
        "summary",
        () => navigate("/dashboard/finetasks"),
      );
    } else {
      fresh.forEach((n) =>
        show(n.title, n.message, n.id, () => {
          markAsRead(n.id);
          navigate("/dashboard/finetasks");
        }),
      );
    }

    markNotified(fresh.map((n) => n.id));
  }, [notifications]);

  return null; // no UI, it only reacts
};

export const EnableNotificationsButton = () => {
  const supported = "Notification" in window;
  const [perm, setPerm] = useState(
    supported ? Notification.permission : "denied",
  );
  if (!supported) return null;
  if (perm === "granted")
    return <span className='text-green-400'>Notifications on</span>;
  return (
    <button
      onClick={async () => setPerm(await Notification.requestPermission())}
    >
      Enable notifications
    </button>
  );
};
