import { component$ } from "@builder.io/qwik";
import { LikeOutlineIcon } from "~/icons/like";

export const Like = component$(() => {
  return (
    <div>
      <button class="btn btn-ghost">
        <LikeOutlineIcon />
        100
      </button>
    </div>
  );
});
