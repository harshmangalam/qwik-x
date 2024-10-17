import { component$ } from "@builder.io/qwik";
import { Comment } from "./comment";
// import { Stat } from "./stat";
import { Link, useNavigate } from "@builder.io/qwik-city";
import type { PostWithAuthor } from "~/types";
import { Like } from "./like";
import { Share } from "./share";

export type Props = PostWithAuthor & {
  disabled?: boolean;
  compact?: boolean;
};

export const PostCard = component$((props: Props) => {
  const {
    compact = false,
    disabled = false,
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
    <article
      class={[
        "w-full card rounded-lg shadow-md transition-shadow duration-300",
        { "card-compact": compact },
        { "hover:bg-base-200 cursor-pointer": !disabled },
        { "border border-base-300 rounded-xl": disabled },
      ]}
    >
      <div class={["card-body", { "pb-2": !disabled }]}>
        <div class="flex gap-4 items-start">
          <div class="avatar flex-none">
            <div class="w-11 h-11 rounded-full">
              <Link href={`/${author.username}/`}>
                <img
                  src={author.avatar.url}
                  width={44}
                  height={44}
                  alt={`${author.name}'s avatar`}
                  class="rounded-full"
                />
              </Link>
            </div>
          </div>

          <div class="flex flex-1 flex-col gap-1">
            <div class="flex items-baseline">
              <Link href={`/${author.username}/`} class="font-bold link link-hover">
                {author.name}
              </Link>
              <span class="leading-4 opacity-70 ml-2">@{author.username} · {createdAt}</span>
            </div>

            {parentPost && (
              <div class="text-sm text-gray-500 mt-1">
                <span class="opacity-70">Replying to </span>
                <button
                  preventdefault:click
                  onClick$={(ev) => {
                    if (disabled) return;
                    ev.stopPropagation();
                    navigate(`/${parentPost.author.username}`);
                  }}
                  class="text-info hover:underline"
                  aria-label={`Replying to ${parentPost.author.username}`}
                >
                  @{parentPost.author.username}
                </button>
              </div>
            )}

            <Link href={disabled ? `#` : `/posts/${id}`}>
              <p class="mt-2 text-lg leading-5">{text}</p>

              {media && (
                <figure class="mt-3">
                  <img
                    src={media.url}
                    alt="Post image"
                    width={600}
                    height={400}
                    class="w-full rounded-2xl object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </figure>
              )}
            </Link>

            {!disabled && (
              <div class="card-actions justify-between pt-3">
                <Comment postId={id} count={repliesCount} />
                <Like postId={id} isLiked={isLiked} count={likesCount} />
                <Share />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
});

