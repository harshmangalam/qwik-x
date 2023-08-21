import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
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
    count: number;
  }) => {
    const actionSig = useTogglePostsLikes();
    return (
      <Form action={actionSig}>
        <Button
          type="submit"
          btnClass={{ "text-error": isLiked }}
          disabled={actionSig.isRunning}
          colorScheme="btn-ghost"
        >
          <input type="hidden" name="postId" value={postId} />
          {isLiked ? <LikeIcon /> : <LikeOutlineIcon />}
          {count}
        </Button>
      </Form>
    );
  }
);
