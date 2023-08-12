import { component$ } from "@builder.io/qwik";
import { StatOutlineIcon } from "~/icons/stat";

export const Stat = component$(() => {
  return (
    <div>
      <button class="btn btn-ghost">
        <StatOutlineIcon />
        16,789
      </button>
    </div>
  );
});
