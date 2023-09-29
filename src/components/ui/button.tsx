import { type QwikIntrinsicElements, component$, Slot } from "@builder.io/qwik";

type Props = QwikIntrinsicElements["button"] & {
  loading?: boolean;
  fullWidth?: boolean;
  circle?: boolean;
  outline?: boolean;
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
    circle = false,
    outline = false,
    ...rest
  } = props;
  return (
    <button
      disabled={loading}
      class={[
        "btn  transition-all duration-500",
        colorScheme,
        size,
        { "btn-block": fullWidth },
        { "rounded-full": roundedFull },
        { "btn-circle": circle },
        { "btn-outline": outline },
        btnClass,
      ]}
      {...rest}
    >
      {loading ? <span class={`loading loading-dots`}></span> : <Slot />}
    </button>
  );
});
