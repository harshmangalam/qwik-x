import { type QwikIntrinsicElements, component$, Slot } from "@builder.io/qwik";

type Props = QwikIntrinsicElements["button"] & {
  loading?: boolean;
  fullWidth?: boolean;
  size?: "btn-xs" | "btn-sm" | "btn-md" | "btn-lg";
  btnClass?: any;
  colorScheme?:
    | "btn-neutral"
    | "btn-primary"
    | "btn-secondary"
    | "btn-error"
    | "btn-success"
    | "btn-info"
    | "btn-warning";
};
export const Button = component$((props: Props) => {
  const {
    loading,
    fullWidth = false,
    colorScheme = "",
    size = "btn-md",
    btnClass = null,

    ...rest
  } = props;
  return (
    <button
      disabled={loading}
      class={["btn", colorScheme, size, btnClass, { "btn-block": fullWidth }]}
      {...rest}
    >
      {loading && <span class={`loading loading-spinner`}></span>}
      <Slot />
    </button>
  );
});
