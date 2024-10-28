import { component$, useSignal, $ } from "@builder.io/qwik";
import { LikeIcon, LikeOutlineIcon } from "~/icons/like";
import { useTogglePostsLikes } from "~/routes/(app)/layout";
import { Button } from "../ui/button";
import { Form } from "@builder.io/qwik-city";

export const Like = component$(
  ({
    postId,
    isLiked: initialLikedStatus,
    count: initialCount = 0,
    isLarge = false,
  }: {
    postId: number;
    isLiked?: boolean;
    count?: number;
    isLarge?: boolean;
  }) => {

    //Local State 
    const likedStatus = useSignal(initialLikedStatus);
    const countNumber = useSignal(initialCount);
    const timeOut = useSignal<ReturnType<typeof setTimeout> | null>(null);

    const actionSig = useTogglePostsLikes();

    //toggle like function 
    const toggleLike = $(() => {
      likedStatus.value = !likedStatus.value;
      countNumber.value = likedStatus.value ? countNumber.value + 1 : Math.max(0, countNumber.value - 1);
    })

    return (
      <Form class="flex items-center group gap-1" >
        <input type="hidden" name="postId" value={postId} />
        <Button
          title={likedStatus.value ? "Unlike" : "Like"}
          size={isLarge ? "btn-md" : "btn-sm"}
          circle
          type="submit"
          btnClass={"group-hover:btn-secondary"}
          // loading={actionSig.isRunning}
          colorScheme={likedStatus.value ? "btn-secondary" : "btn-ghost"}
          onClick$={(ev) => {
            ev.stopPropagation();
            try {
              toggleLike();
              actionSig.submit({ postId: postId.toString() });
            } catch (error) {
              toggleLike();
              console.log("Error while toggling like ", error);
            }
          }}
        >
          {likedStatus.value ? <LikeIcon /> : <LikeOutlineIcon />}
        </Button>
        <div
          class={["group-hover:text-secondary", { "text-secondary": likedStatus.value }]}
        >
          {countNumber.value}
        </div>
      </Form >
    );
  }
);
