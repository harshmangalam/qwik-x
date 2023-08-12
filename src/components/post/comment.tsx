import { component$ } from "@builder.io/qwik";
import { CommentOutlineIcon } from "~/icons/comment";

export const Comment = component$(() => {
  return (
    <div>
      <button class="btn btn-ghost">
        <CommentOutlineIcon />5
      </button>
    </div>
  );
});
