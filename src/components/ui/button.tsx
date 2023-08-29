import { type QwikIntrinsicElements, component$, Slot } from "@builder.io/qwik";

type Props = QwikIntrinsicElements["button"] & {
  loading?: boolean;
  fullWidth?: boolean;
  roundedFull?: boolean;
  size?: "btn-xs" | "btn-sm" | "btn-md" | "btn-lg";
  btnClass?: any;
  colorScheme?:
    | "btn-neutral"
    | "btn-primary"
    | "btn-secondary"
    | "btn-error"
    | "btn-success"
    | "btn-info"
    | "btn-warning"
    | "btn-ghost";
};
export const Button = component$((props: Props) => {
  const {
    loading,
    fullWidth = false,
    colorScheme = "",
    size = "btn-md",
    btnClass = null,
    roundedFull = false,

    ...rest
  } = props;
  return (
    <button
      disabled={loading}
      class={[
        "btn",
        colorScheme,
        size,
        { "btn-block": fullWidth },
        { "rounded-full": roundedFull },
        btnClass,
      ]}
      {...rest}
    >
      {loading ? <span class={`loading loading-spinner`}></span> : <Slot />}
    </button>
  );
});
