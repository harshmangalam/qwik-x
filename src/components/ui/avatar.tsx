import { type QwikIntrinsicElements, component$, Slot } from "@builder.io/qwik";

type Props = QwikIntrinsicElements["div"] & {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isPlaceholder?: boolean;
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
  rootClass?: string;
  imgContainerClass?: string;
  mask?: string;
};
export const Avatar = component$((props: Props) => {
  const {
    size = "md",
    isPlaceholder = false,
    online = false,
    offline = false,
    circle = false,
    rounded = "rounded",
    colorSchema = "none",
    rootClass = "",
    imgContainerClass = "",
    mask = "",
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
    <div
      class={[
        "avatar",
        { placeholder: isPlaceholder },
        { online },
        { offline },
        rootClass,
      ]}
      {...rest}
    >
      <div
        class={[
          { "rounded-full": circle },
          rounded,
          sizes[size],
          colorSchemas[colorSchema],
          mask,
          imgContainerClass,
        ]}
      >
        <Slot />
      </div>
    </div>
  );
});
