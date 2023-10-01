import { $, type QwikMouseEvent, component$ } from "@builder.io/qwik";
import { BookmarkIcon, BookmarkOutlineIcon } from "~/icons/bookmark";
import { Button } from "../ui/button";
import { useBookmark } from "~/routes/(app)/layout";

type Props = {
  postId: number;
  count?: number;
  isBookmarked?: boolean;
  isLarge?: boolean;
};
export const Bookmark = component$(
  ({ postId, count, isBookmarked = false, isLarge = false }: Props) => {
    const actionSig = useBookmark();
    const handleComment = $((ev: QwikMouseEvent) => {
      ev.stopPropagation();
      actionSig.submit({ postId });
    });

    return (
      <div>
        <Button
          preventdefault:click
          onClick$={handleComment}
          colorScheme={isBookmarked ? "btn-primary" : "btn-ghost"}
          btnClass="group-hover:text-primary"
          loading={actionSig.isRunning}
          size={isLarge ? "btn-md" : "btn-sm"}
          circle
        >
          {isBookmarked ? <BookmarkIcon /> : <BookmarkOutlineIcon />}
        </Button>
        <div
          class={["group-hover:text-primary", { "text-primary": isBookmarked }]}
        >
          {count}
        </div>
      </div>
    );
  }
);
