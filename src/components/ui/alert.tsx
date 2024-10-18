import { $, component$, useStore } from "@builder.io/qwik";

type Props = {
  text: string;
  status: "alert-info" | "alert-success" | "alert-warning" | "alert-error";
};

export const Alert = component$((props: Props) => {
  const { text, status = "alert-info" } = props;
  const store = useStore({ isVisible: true });

  const handleClose = $(() => {
    store.isVisible = false;
  });

  if (!store.isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      class={["alert flex justify-between gap-2", status]}
      aria-label="Alert"
    >
      <span>{text}</span>

      <button
        onClick$={handleClose}
        aria-label="Close alert"
        class="close-button"
      >
        &times; {/* Close icon */}
      </button>
    </div>
  );
});
