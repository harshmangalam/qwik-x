import { $, type QwikMouseEvent, component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { CommentOutlineIcon } from "~/icons/comment";

type Props = { postId: number; count?: number };
export const Comment = component$(({ count, postId }: Props) => {
  const navigate = useNavigate();
  const handleComment = $((ev: QwikMouseEvent) => {
    ev.stopPropagation();
    navigate(`/posts/${postId}`);
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
