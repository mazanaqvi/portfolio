import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { ToastContext } from "../../hooks/useToast";

interface Toast {
  id: number;
  message: string;
}

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const seq = useRef(0);

  const push = useCallback((message: string) => {
    const id = ++seq.current;
    setToasts((t) => [...t, { id, message }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2200);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="toast-stack" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              className="toast"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <Check />
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
