import { component$, useStore } from "@builder.io/qwik";

type Props = {
  text: string;
  status: "alert-info" | "alert-success" | "alert-warning" | "alert-error";
  onClose?: () => void;
};

export const Alert = component$((props: Props) => {
  const { text, status = "alert-info", onClose } = props;
  const store = useStore({ isVisible: true });

  const handleClose = $(() => {
    store.isVisible = false;
    if (onClose) {
      onClose();
    }
  });

  if (!store.isVisible) return null;

  return (
    <div 
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true" 
      class={["alert", status]} 
      aria-label="Alert"
    >
      <span>{text}</span>
      {onClose && (
        <button 
          onClick$={handleClose} 
          aria-label="Close alert"
          class="close-button"
        >
          &times; {/* Close icon */}
        </button>
      )}
    </div>
  );
});
