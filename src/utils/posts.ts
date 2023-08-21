import {
  type RequestEventLoader,
  type RequestEventAction,
} from "@builder.io/qwik-city";
import { db } from "~/database/connection";
import { type NewPost, posts } from "~/database/schema/posts";
import type { AuthUser, CreatePostSchema } from "~/types";
import { formatDistanceToNowStrict } from "date-fns";
import { and, eq, sql } from "drizzle-orm";
import { postsLikes } from "~/database/schema/posts-likes";

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
  { replyPrivacy, text, visibility }: CreatePostSchema,
  { sharedMap, redirect, error, url }: RequestEventAction
) {
  const user = sharedMap.get("user") as AuthUser | undefined;
  if (!user) throw error(403, "Unauthorized");
  await createPost({
    authorId: user.id,
    replyPrivacy: replyPrivacy as any,
    visibility: visibility as any,
    text,
  });
  throw redirect(302, url.pathname);
}
async function createPost(values: NewPost) {
  const data = await db.insert(posts).values(values).returning();
  return data[0];
}

async function handlePostFeeds({ sharedMap }: RequestEventLoader) {
  const user = sharedMap.get("user") as AuthUser | undefined;
  const posts = await db.query.posts.findMany({
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
    });
  }

  return formattedPosts;
}

async function fetchProfilePosts({
  params,
  error,
  sharedMap,
}: RequestEventLoader) {
  const currentUser = sharedMap.get("user");
  const user = await db.query.users.findFirst({
    where(users, { eq }) {
      return eq(users.username, params.username);
    },
  });
  if (!user) throw error(404, "User not found");
  const posts = await db.query.posts.findMany({
    where(posts, { eq }) {
      return eq(posts.authorId, user.id);
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
    });
  }
  return formattedPosts;
}

async function fetchProfilePostsCount({ error, params }: RequestEventLoader) {
  const user = await db.query.users.findFirst({
    where(users, { eq }) {
      return eq(users.username, params.username);
    },
  });
  if (!user) throw error(404, "User not found");
  const data = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(posts)
    .where(eq(posts.authorId, user.id));

  return data[0];
}

async function toggleLikePosts(
  postId: number,
  { error, redirect, url, sharedMap }: RequestEventAction
) {
  const user = sharedMap.get("user") as AuthUser | undefined;
  if (!user) throw error(403, "unauthorized");
  const post = await findPostById(postId);
  if (!post) throw error(404, "Post not found");

  // check user already like the post
  const alreadyLike = await isPostAlreadyLiked(postId, user.id);
  console.log(alreadyLike);
  if (alreadyLike) {
    // unlike post
    await deletePostsLikes(postId, user.id);
  } else {
    // like post
    await createPostsLikes(postId, user.id);
  }
  throw redirect(302, url.pathname);
}

export {
  handleCreatePost,
  createPost,
  handlePostFeeds,
  fetchProfilePosts,
  fetchProfilePostsCount,
  toggleLikePosts,
};
