import { component$ } from "@builder.io/qwik";
import { LikeIcon, LikeOutlineIcon } from "~/icons/like";
import { useTogglePostsLikes } from "~/routes/(app)/layout";
import { Button } from "../ui/button";

export const Like = component$(
  ({
    postId,
    isLiked,
    count,
  }: {
    postId: number;
    isLiked: boolean;
    count?: number;
  }) => {
    const actionSig = useTogglePostsLikes();
    return (
      <Button
        btnClass={{ "text-error": isLiked }}
        loading={actionSig.isRunning}
        colorScheme="btn-ghost"
        onClick$={(ev) => {
          ev.stopPropagation();
          actionSig.submit({ postId });
        }}
        preventdefault:click
      >
        {isLiked ? <LikeIcon /> : <LikeOutlineIcon />}
        {count}
      </Button>
    );
  }
);
