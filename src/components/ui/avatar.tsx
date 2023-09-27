import { type QwikIntrinsicElements, component$, Slot } from "@builder.io/qwik";

type Props = QwikIntrinsicElements["div"] & {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  placeholder?: boolean;
  online?: boolean;
  offline?: boolean;
  rounded?:
    | "rounded"
    | "rounded-sm"
    | "rounded-xs"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-xl"
    | "rounded-full";
  circle?: boolean;
  colorSchema?:
    | "none"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning";
};
export const Avatar = component$((props: Props) => {
  const {
    size = "md",
    placeholder = false,
    online = false,
    offline = false,
    circle = false,
    rounded = "rounded",
    colorSchema = "none",
    ...rest
  } = props;

  const sizes = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };
  const colorSchemas = {
    none: "",
    primary: "bg-primary-focus text-primary-content",
    secondary: "bg-secondary-focus text-secondary-content",
    warning: "bg-warning-focus text-warning-content",
    success: "bg-success-focus text-success-content",
    error: "bg-error-focus text-error-content",
  };
  return (
    <div class={["avatar", { placeholder }, { online }, { offline }]} {...rest}>
      <div
        class={[
          "mask mask-squircle bg-primary-focus text-primary-content",
          { "rounded-full": circle },
          rounded,
          sizes[size],
          colorSchemas[colorSchema],
        ]}
      >
        <Slot />
      </div>
    </div>
  );
});
