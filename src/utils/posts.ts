import {
  type RequestEventLoader,
  type RequestEventAction,
} from "@builder.io/qwik-city";
import { db } from "~/database/connection";
import { type NewPost, posts } from "~/database/schema/posts";
import type { AuthUser, CreatePostSchema } from "~/types";
import { formatDistanceToNowStrict } from "date-fns";

async function handleCreatePost(
  { replyPrivacy, text, visibility }: CreatePostSchema,
  { sharedMap, redirect, error }: RequestEventAction
) {
  const user = sharedMap.get("user") as AuthUser | undefined;
  if (!user) throw error(403, "Unauthorized");
  await createPost({
    authorId: user.id,
    replyPrivacy: replyPrivacy as any,
    visibility: visibility as any,
    text,
  });
  throw redirect(302, "/");
}

async function createPost(values: NewPost) {
  const data = await db.insert(posts).values(values).returning();
  return data[0];
}

async function handlePostFeeds(_: RequestEventLoader) {
  const posts = await db.query.posts.findMany({
    with: {
      author: {
        columns: {
          avatar: true,
          id: true,
          username: true,
          name: true,
        },
      },
    },

    orderBy({ createdAt }, { desc }) {
      return desc(createdAt);
    },
  });

  return posts.map((post) => ({
    ...post,
    createdAt: formatDistanceToNowStrict(post.createdAt),
  }));
}

async function getProfilePosts({ params, error }: RequestEventLoader) {
  const user = await db.query.users.findFirst({
    where(users, { eq }) {
      return eq(users.username, params.username);
    },
  });
  if (!user) throw error(404, "User not found");
  return db.query.posts.findMany({
    where(posts, { eq }) {
      return eq(posts.authorId, user.id);
    },
  });
}

export { handleCreatePost, createPost, handlePostFeeds, getProfilePosts };
