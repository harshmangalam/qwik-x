import { $, type QwikMouseEvent, component$ } from "@builder.io/qwik";
import { CommentOutlineIcon } from "~/icons/comment";

type Props = { postId: number; count?: number };
export const Bookmark = component$(({ postId, count }: Props) => {
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
        <CommentOutlineIcon />
        {count}
      </button>
    </div>
  );
});
