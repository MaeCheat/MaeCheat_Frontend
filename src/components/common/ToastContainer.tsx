import type { Toast } from "../../hooks/useToast";

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: number) => void;
}

const typeStyles = {
  error: "bg-red-500/90",
  success: "bg-emerald-500/90",
  info: "bg-accent/90",
};

const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${typeStyles[toast.type]} text-white rounded-lg shadow-lg backdrop-blur-sm px-4 py-3 flex items-center justify-between gap-3 animate-slide-down`}
        >
          <p className="text-sm">{toast.message}</p>
          <button
            onClick={() => onRemove(toast.id)}
            className="text-white/70 hover:text-white text-lg leading-none cursor-pointer shrink-0"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
