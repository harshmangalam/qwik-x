import { $, type QwikMouseEvent, component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { CommentOutlineIcon } from "~/icons/comment";
import { Button } from "../ui/button";

type Props = { postId: number; count?: number; isLarge?: boolean };
export const Comment = component$(
  ({ count, postId, isLarge = false }: Props) => {
    const navigate = useNavigate();
    const handleComment = $((ev: QwikMouseEvent) => {
      ev.stopPropagation();
      navigate(`/posts/${postId}`);
    });
    return (
      <div class="flex items-center group gap-1">
        <Button
          size={isLarge ? "btn-md" : "btn-sm"}
          circle
          btnClass={"group-hover:btn-info"}
          preventdefault:click
          onClick$={handleComment}
          colorScheme="btn-ghost"
        >
          <CommentOutlineIcon />
        </Button>
        <div class={["group-hover:text-info"]}>{count}</div>
      </div>
    );
  }
);
