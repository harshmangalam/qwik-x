import {
  type RequestEventLoader,
  type RequestEventAction,
} from "@builder.io/qwik-city";
import { db } from "~/database/connection";
import { type NewPost, posts } from "~/database/schema/posts";
import type { AuthUser } from "~/types";
import { formatDistanceToNowStrict } from "date-fns";
import { and, eq, isNull, sql } from "drizzle-orm";
import { postsLikes } from "~/database/schema/posts-likes";

async function fetchPostRepliesCount(postId?: number | null) {
  if (!postId) return 0;
  const [result] = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(posts)
    .where(eq(posts.parentPostId, postId));

  return result.count;
}
async function findPostById(id: number) {
  return db.query.posts.findFirst({
    where(posts, { eq }) {
      return eq(posts.id, id);
    },
  });
}
async function isPostAlreadyLiked(postId: number, userId?: number) {
  if (!userId) return false;
  const data = await db
    .select()
    .from(postsLikes)
    .where(and(eq(postsLikes.postId, postId), eq(postsLikes.userId, userId)));

  if (data.length) return true;
  return false;
}
async function createPostsLikes(postId: number, userId: number) {
  return db.insert(postsLikes).values({ postId, userId: userId });
}
async function deletePostsLikes(postId: number, userId: number) {
  return db
    .delete(postsLikes)
    .where(and(eq(postsLikes.postId, postId), eq(postsLikes.userId, userId)));
}
async function handleCreatePost(
  postData: Partial<NewPost>,
  { sharedMap, redirect, error, url }: RequestEventAction
) {
  const user = sharedMap.get("user") as AuthUser | undefined;
  if (!user) throw error(403, "Unauthorized");
  await createPost({
    ...postData,
    authorId: user.id,
  });
  throw redirect(302, url.pathname);
}
async function createPost(values: NewPost) {
  const data = await db.insert(posts).values(values).returning();
  return data[0];
}

async function fetchPostLikesCount(postId: number) {
  const [result] = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(postsLikes)
    .where(eq(postsLikes.postId, postId));

  return result.count;
}
async function fetchPostsFeed({ sharedMap }: RequestEventLoader) {
  const user = sharedMap.get("user") as AuthUser | undefined;
  const posts = await db.query.posts.findMany({
    where(fields) {
      return isNull(fields.parentPostId);
    },
    with: {
      author: true,
    },

    orderBy({ createdAt }, { desc }) {
      return desc(createdAt);
    },
  });

  const formattedPosts = [];

  for (const post of posts) {
    formattedPosts.push({
      ...post,
      isLiked: await isPostAlreadyLiked(post.id, user?.id),
      createdAt: formatDistanceToNowStrict(post.createdAt),
      likesCount: await fetchPostLikesCount(post.id),
      repliesCount: await fetchPostRepliesCount(post.id),
    });
  }

  return formattedPosts;
}

async function toggleLikePosts(
  postId: number,
  { error, redirect, url, sharedMap }: RequestEventAction
) {
  const user = sharedMap.get("user") as AuthUser | undefined;
  if (!user) throw redirect(308, "/login");
  const post = await findPostById(postId);
  if (!post) throw error(404, "Post not found");

  // check user already like the post
  const alreadyLike = await isPostAlreadyLiked(postId, user.id);
  if (alreadyLike) {
    // unlike post
    await deletePostsLikes(postId, user.id);
  } else {
    // like post
    await createPostsLikes(postId, user.id);
  }
  throw redirect(302, url.pathname);
}

async function fetchPostReplies({ params, sharedMap }: RequestEventAction) {
  const currentUser = sharedMap.get("user") as AuthUser | undefined;
  const postId = +params.postId;
  const posts = await db.query.posts.findMany({
    where(fields, { eq }) {
      return eq(fields.parentPostId, postId);
    },
    with: {
      author: true,
    },

    orderBy({ createdAt }, { desc }) {
      return desc(createdAt);
    },
  });

  const formattedPosts = [];

  for (const post of posts) {
    formattedPosts.push({
      ...post,
      isLiked: await isPostAlreadyLiked(post.id, currentUser?.id),
      createdAt: formatDistanceToNowStrict(post.createdAt),
      likesCount: await fetchPostLikesCount(post.id),
      repliesCount: await fetchPostRepliesCount(post.id),
    });
  }

  return formattedPosts;
}

export {
  handleCreatePost,
  createPost,
  fetchPostsFeed,
  toggleLikePosts,
  isPostAlreadyLiked,
  fetchPostLikesCount,
  fetchPostReplies,
  fetchPostRepliesCount,
};
