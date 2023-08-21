import { component$ } from "@builder.io/qwik";
import { Comment } from "./comment";
import { Stat } from "./stat";
import { Share } from "./share";
import type { PostWithAuthor } from "~/types";
import { Like } from "./like";

export type Props = PostWithAuthor & {};
export const PostCard = component$((props: Props) => {
  const { author, media, text, createdAt, id, isLiked } = props;
  return (
    <article class="card rounded-none">
      <div class="card-body pb-2">
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="w-11 h-11 rounded-full">
              <img src={author.avatar.url} width={44} height={44} />
            </div>
          </div>
          <div class="flex flex-col gap-0">
            <span class="font-bold">{author.name}</span>
            <div class="leading-4 text-sm">
              <span> @{author.username}</span>
              <span> · </span>
              <span> {createdAt} </span>
            </div>
          </div>
        </div>

        <div>{text}</div>
        {media && (
          <figure class="mt-3">
            <img
              src={media.url}
              alt="Post image"
              width={600}
              height={400}
              class="w-full rounded-2xl"
            />
          </figure>
        )}
        <div class="card-actions justify-between pt-3">
          <Comment />
          <Like postId={id} isLiked={isLiked} count={10} />
          <Stat />
          <Share />
        </div>
      </div>
    </article>
  );
});
