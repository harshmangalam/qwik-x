import { $, type QwikMouseEvent, component$ } from "@builder.io/qwik";
import { BookmarkIcon, BookmarkOutlineIcon } from "~/icons/bookmark";
import { Button } from "../ui/button";
import { useBookmark } from "~/routes/(app)/layout";

type Props = { postId: number; count?: number; isBookmarked?: boolean };
export const Bookmark = component$(
  ({ postId, count, isBookmarked = false }: Props) => {
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
          colorScheme="btn-ghost"
          btnClass={{ "text-info": isBookmarked }}
          loading={actionSig.isRunning}
        >
          {isBookmarked ? <BookmarkIcon /> : <BookmarkOutlineIcon />}
          {count}
        </Button>
      </div>
    );
  }
);
