import { component$ } from "@builder.io/qwik";
import { Comment } from "./comment";
// import { Stat } from "./stat";
import { Share } from "./share";
import type { PostWithAuthor } from "~/types";
import { Like } from "./like";
import { Link, useNavigate } from "@builder.io/qwik-city";

export type Props = PostWithAuthor;
export const PostCard = component$((props: Props) => {
  const {
    author,
    media,
    text,
    createdAt,
    id,
    isLiked,
    likesCount,
    repliesCount,
    parentPost,
  } = props;
  const navigate = useNavigate();
  return (
    <Link href={`/posts/${id}`}>
      <article class="card rounded-none hover:bg-base-200">
        <div class="card-body pb-2">
          <div class="flex gap-3">
            <div class="avatar flex-none">
              <div class="w-11 h-11 rounded-full">
                <img src={author.avatar.url} width={44} height={44} />
              </div>
            </div>
            <div class="flex flex-1 flex-col gap-0">
              <div class="flex flex-1 flex-col gap-0">
                <div class="font-bold">{author.name}</div>
                <div class="leading-4 opacity-70">
                  <button
                    preventdefault:click
                    onClick$={(ev) => {
                      ev.stopPropagation();
                      navigate(`/${author.username}`);
                    }}
                    class="hover:underline"
                  >
                    @{author.username}
                  </button>
                  <span> · </span>
                  <span> {createdAt} </span>
                </div>
              </div>

              {parentPost && (
                <div>
                  <span class="opacity-70">Replying to </span>
                  <button
                    preventdefault:click
                    onClick$={(ev) => {
                      ev.stopPropagation();
                      navigate(`/${parentPost.author.username}`);
                    }}
                    class="text-info hover:underline"
                  >
                    @{parentPost.author.username}
                  </button>
                </div>
              )}

              <div class="mt-3">{text}</div>

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
                <Comment postId={id} count={repliesCount} />
                <Like postId={id} isLiked={isLiked} count={likesCount} />
                {/* <Stat /> */}
                <Share />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
});
