import { $, type QwikMouseEvent, component$ } from "@builder.io/qwik";
import { CommentOutlineIcon } from "~/icons/comment";

export const Comment = component$(() => {
  const handleComment = $((ev: QwikMouseEvent) => {
    ev.stopPropagation();
  });
  return (
    <div>
      <button
        preventdefault:click
        onClick$={handleComment}
        class="btn btn-ghost"
      >
        <CommentOutlineIcon />5
      </button>
    </div>
  );
});
