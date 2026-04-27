import type { Toast } from "../../hooks/useToast";

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: number) => void;
}

const typeStyles = {
  error: "bg-error",
  success: "bg-success",
  info: "bg-info",
};

const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${typeStyles[toast.type]} text-text-inverse rounded-lg shadow-lg px-4 py-3 flex items-center justify-between gap-3 animate-slide-down`}
        >
          <p className="text-sm">{toast.message}</p>
          <button
            onClick={() => onRemove(toast.id)}
            className="text-text-inverse/70 hover:text-text-inverse text-lg leading-none cursor-pointer shrink-0"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
