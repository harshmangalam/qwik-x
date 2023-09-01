import { type QwikIntrinsicElements, component$ } from "@builder.io/qwik";

type Props = QwikIntrinsicElements["select"] & {
  label?: string;
  error?: string | string[];
  bordered?: boolean;
  options: { label: string; value: string; selected: boolean }[];
  colorScheme?:
    | "select-primary"
    | "select-secondary"
    | "select-info"
    | "select-accent"
    | "select-success"
    | "select-warning"
    | "select-error";
};
export const Select = component$((props: Props) => {
  const {
    label,
    id,
    error,
    bordered = true,
    colorScheme = "",
    options,
    ...rest
  } = props;
  return (
    <div class="form-control w-full">
      {label && (
        <label for={id} class="label">
          <span class="label-text">{label}</span>
        </label>
      )}
      <select
        id={id}
        class={["select w-full", { "select-bordered": bordered }, colorScheme]}
        {...rest}
      >
        {options.map(({ label, value, selected }) => (
          <option selected={selected} key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <label class="label">
          <span class="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
});
