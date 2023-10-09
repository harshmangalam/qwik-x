import { component$ } from "@builder.io/qwik";
import { LikeIcon, LikeOutlineIcon } from "~/icons/like";
import { useTogglePostsLikes } from "~/routes/(app)/layout";
import { Button } from "../ui/button";
import { Form } from "@builder.io/qwik-city";

export const Like = component$(
  ({
    postId,
    isLiked,
    count,
    isLarge = false,
  }: {
    postId: number;
    isLiked?: boolean;
    count?: number;
    isLarge?: boolean;
  }) => {
    const actionSig = useTogglePostsLikes();
    return (
      <Form action={actionSig} class="flex items-center group gap-1">
        <input type="hidden" name="postId" value={postId} />
        <Button
          title={isLiked ? "Unlike" : "Like"}
          size={isLarge ? "btn-md" : "btn-sm"}
          circle
          type="submit"
          btnClass={"group-hover:btn-secondary"}
          loading={actionSig.isRunning}
          colorScheme={isLiked ? "btn-secondary" : "btn-ghost"}
          onClick$={(ev) => {
            ev.stopPropagation();
          }}
        >
          {isLiked ? <LikeIcon /> : <LikeOutlineIcon />}
        </Button>
        <div
          class={["group-hover:text-secondary", { "text-secondary": isLiked }]}
        >
          {count}
        </div>
      </Form>
    );
  }
);
