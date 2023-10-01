import { component$ } from "@builder.io/qwik";
import { LikeIcon, LikeOutlineIcon } from "~/icons/like";
import { useTogglePostsLikes } from "~/routes/(app)/layout";
import { Button } from "../ui/button";

export const Like = component$(
  ({
    postId,
    isLiked,
    count,
    isLarge = false,
  }: {
    postId: number;
    isLiked: boolean;
    count?: number;
    isLarge?: boolean;
  }) => {
    const actionSig = useTogglePostsLikes();
    return (
      <div class="flex items-center group gap-1">
        <Button
          title={isLiked ? "Unlike" : "Like"}
          size={isLarge ? "btn-md" : "btn-sm"}
          circle
          btnClass={"group-hover:btn-secondary"}
          loading={actionSig.isRunning}
          colorScheme={isLiked ? "btn-secondary" : "btn-ghost"}
          onClick$={(ev) => {
            ev.stopPropagation();
            actionSig.submit({ postId });
          }}
          preventdefault:click
        >
          {isLiked ? <LikeIcon /> : <LikeOutlineIcon />}
        </Button>
        <div
          class={["group-hover:text-secondary", { "text-secondary": isLiked }]}
        >
          {count}
        </div>
      </div>
    );
  }
);
