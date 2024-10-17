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

  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div class="form-control w-full">
      {label && (
        <label for={textareaId} class="label">
          <span class="label-text">{label}</span>
        </label>
      )}
      <textarea
        id={textareaId}
        class={[
          "textarea w-full",
          { "textarea-bordered": bordered },
          colorScheme,
        ]}
        aria-label={!label ? "Textarea input" : undefined}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...rest}
      />
      {error && (
        <label id={`${textareaId}-error`} class="label">
          <span class="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
});
