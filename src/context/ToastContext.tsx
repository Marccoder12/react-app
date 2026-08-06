import { createContext, useContext, useReducer, ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number; // in ms
}

type ToastAction =
  | { type: "ADD_TOAST"; payload: Toast }
  | { type: "REMOVE_TOAST"; payload: string };

const toastReducer = (state: Toast[], action: ToastAction): Toast[] => {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.payload];
    case "REMOVE_TOAST":
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
};

const ToastContext = createContext<{
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
} | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const addToast = (type: ToastType, message: string, duration = 4000) => {
    const id = Date.now().toString();
    dispatch({ type: "ADD_TOAST", payload: { id, type, message, duration } });

    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", payload: id });
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts }: { toasts: Toast[] }) => (
  <>
    <style>{`
      @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
    `}</style>
    <div className="fixed bottom-4 right-4 z-50 flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-[#ececec1e] mt-5 px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 max-w-xs font-bold 
                ${toast.type === "success" ? "shadow shadow-[#242424] border-5 text-green-400 border-green-500" : ""}
                ${toast.type === "error" ? " border-5 text-red-400 border-red-500" : ""}
                ${toast.type === "info" ? " border-5 text-blue-400 border-blue-500" : ""}
                ${toast.type === "warning" ? "border-5 text-yellow-400 border-yellow-500" : ""}`}
          style={{ animation: "slideInRight 0.3s ease-out forwards", willChange: "transform" }}
        >
          <span className="text-shadow-md text-shadow-[#242424]">{toast.message}</span>
        </div>
      ))}
    </div>
  </>
);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context.addToast;
};
