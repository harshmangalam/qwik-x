import { type RequestEventAction } from "@builder.io/qwik-city";
import { db } from "~/database/connection";
import { type NewPost, posts } from "~/database/schema/posts";
import type { AuthUser } from "~/types";

async function handleCreatePost(
  data: NewPost,
  { sharedMap, redirect, error }: RequestEventAction
) {
  const user = sharedMap.get("user") as AuthUser | undefined;
  if (!user) throw error(403, "Unauthorized");
  await createPost(data);
  throw redirect(302, "/");
}

async function createPost(values: NewPost) {
  const data = await db.insert(posts).values(values).returning();
  return data[0];
}

export { handleCreatePost, createPost };
