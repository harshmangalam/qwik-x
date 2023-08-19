import { component$ } from "@builder.io/qwik";

export const Visibility = component$(() => {
  const options = ["Everyone", "Circle"];
  return (
    <select
      name="visibility"
      class="select select-bordered w-full rounded-full select-sm max-w-fit"
    >
      <option disabled selected>
        Visibility
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
});
