import { component$ } from "@builder.io/qwik";
import { ShareOutlineIcon } from "~/icons/share";

export const Share = component$(() => {
  return (
    <button class="btn btn-ghost btn-circle">
      <ShareOutlineIcon />
    </button>
  );
});
