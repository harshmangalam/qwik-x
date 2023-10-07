import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { Bookmark } from "~/components/post/bookmark";
import { Like } from "~/components/post/like";
import { Share } from "~/components/post/share";
import { db } from "~/database/connection";
import { format } from "date-fns";
import type { AuthUser } from "~/types";
import {
  fetchPostLikesCount,
  fetchPostReplies,
  fetchPostRepliesCount,
  handleCreatePost,
  isPostAlreadyLiked,
} from "~/utils/posts";
import { fetchBookmarksCount, isAlreadyBookmarked } from "~/utils/bookmarks";
import { ReplyForm } from "~/components/reply/reply-form";
import { useCurrentUser } from "../../layout";
import { PostCard } from "~/components/post/post-card";

export const usePost = routeLoader$(async ({ params, error, sharedMap }) => {
  const postId = +params.postId;
  const post = await db.query.posts.findFirst({
    where(fields, { eq }) {
      return eq(fields.id, postId);
    },
    with: {
      author: true,
    },
  });
  if (!post) throw error(404, "Post not found");
  const currentUser = sharedMap.get("user") as AuthUser | undefined;

  const likesCount = await fetchPostLikesCount(postId);
  const isLiked = await isPostAlreadyLiked(postId, currentUser?.id);

  const bookmarksCount = await fetchBookmarksCount(postId);
  const isBookmarked = await isAlreadyBookmarked(postId, currentUser?.id);
  const repliesCount = await fetchPostRepliesCount(post.id);

  const createdDate = format(post.createdAt, "h:mm a · MMM d, yyyy");
  return {
    ...post,
    likesCount,
    isLiked,
    bookmarksCount,
    isBookmarked,
    createdAt: createdDate,
    repliesCount,
  };
});

export const useCreateReply = routeAction$(
  async (formData, requestEvent) => {
    return handleCreatePost(
      { ...formData, parentPostId: +formData.parentPostId },
      requestEvent
    );
  },
  zod$({
    text: z.string().nonempty("Enter value for reply field"),
    parentPostId: z.string().nonempty(),
  })
);

export const useFetchPostReply = routeLoader$(async (requestEvent) => {
  return fetchPostReplies(requestEvent);
});

export const head: DocumentHead = ({ resolveValue }) => {
  const post = resolveValue(usePost);

  return {
    title: post.text
      ? `${post.author.username}: ${post.text.slice(0, 20)}`
      : `Post by ${post.author.username}`,
  };
};

export default component$(() => {
  const postSig = usePost();
  const currentUser = useCurrentUser();
  const replySig = useFetchPostReply();
  return (
    <div class="py-4">
      {/* post autor section  */}

      <section class="flex items-center justify-between px-4">
        <div class="flex items-center gap-3">
          <Link class="avatar" href={`/${postSig.value.author.username}/`}>
            <div class="w-10 h-10 rounded-full">
              <img
                width={40}
                height={40}
                src={(postSig.value.author.avatar as any)?.url}
                alt={postSig.value.author.name}
              />
            </div>
          </Link>
          <div class="flex flex-col gap-0">
            <Link href={`/${postSig.value.author.username}/`}>
              <h3 class="font-semibold text-lg">{postSig.value.author.name}</h3>
            </Link>
            <Link class="opacity-70 leading-4" href={`/${postSig.value.author.username}/`}>
              @{postSig.value.author.username}
            </Link>
          </div>
        </div>
      </section>

      {/* post info section  */}
      <section class="mt-4 px-4">
        <p>{postSig.value.text}</p>

        <div class="text-sm mt-4">
          <span class="opacity-70"> {postSig.value.createdAt} </span>
        </div>
        <div class="divider my-2"></div>
        <div class="flex items-center gap-4">
          <Link href="" class="text-sm group">
            <span class="font-bold">{postSig.value.repliesCount} </span>
            <span class="opacity-70 group-hover:underline"> Replies</span>
          </Link>
          <Link href="" class="text-sm group">
            <span class="font-bold">{postSig.value.likesCount} </span>
            <span class="opacity-70 group-hover:underline"> Likes</span>
          </Link>
          <div class="text-sm">
            <span class="font-bold">{postSig.value.bookmarksCount} </span>
            <span class="opacity-70"> Bookmarks</span>
          </div>
        </div>
        <div class="divider my-2"></div>
        <div class="card-actions justify-between pt-3">
          <Like
            isLarge
            postId={postSig.value.id}
            isLiked={postSig.value.isLiked}
          />
          <Bookmark
            isLarge
            postId={postSig.value.id}
            isBookmarked={postSig.value.isBookmarked}
          />
          <Share isLarge />
        </div>
        <div class="divider my-2"></div>
      </section>
      <section class="py-4 px-4">
        <div class="flex gap-4">
          <div class="avatar flex-none">
            <div class="w-10 h-10 rounded-full">
              <img
                width={40}
                height={40}
                src={currentUser.value?.avatar.url}
                alt={currentUser.value?.name}
              />
            </div>
          </div>

          <ReplyForm
            replyTo={postSig.value.author.username}
            parentPostId={postSig.value.id}
          />
        </div>
      </section>
      <div class="divider my-0 py-0"></div>

      <section>
        <div class="grid grid-cols-1 divide-y">
          {replySig.value.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
});
