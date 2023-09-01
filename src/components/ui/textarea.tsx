import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

type Props = QwikIntrinsicElements["textarea"] & {
  label?: string;
  error?: string | string[];
  bordered?: boolean;
  colorScheme?:
    | "textarea-primary"
    | "textarea-secondary"
    | "textarea-info"
    | "textarea-accent"
    | "textarea-success"
    | "textarea-warning"
    | "textarea-error";
};

export const Textarea = component$((props: Props) => {
  const {
    label,
    id,
    error,
    bordered = true,
    colorScheme = "",
    ...rest
  } = props;
  return (
    <div class="form-control w-full">
      {label && (
        <label for={id} class="label">
          <span class="label-text">{label}</span>
        </label>
      )}
      <textarea
        id={id}
        class={[
          "textarea w-full",
          { "textarea-bordered": bordered },
          colorScheme,
        ]}
        {...rest}
      />
      {error && (
        <label class="label">
          <span class="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
});
