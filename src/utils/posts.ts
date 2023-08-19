import {
  type RequestEventLoader,
  type RequestEventAction,
} from "@builder.io/qwik-city";
import { db } from "~/database/connection";
import { type NewPost, posts } from "~/database/schema/posts";
import type { AuthUser, CreatePostSchema } from "~/types";

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
  });

  return posts;
}

export { handleCreatePost, createPost, handlePostFeeds };
