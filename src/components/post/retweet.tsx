import { component$ } from "@builder.io/qwik";
import { RetweetOutlineIcon } from "~/icons/retweet";

export const Retweet = component$(() => {
  return (
    <div>
      <button class="btn btn-ghost">
        <RetweetOutlineIcon />
        10
      </button>
    </div>
  );
});
