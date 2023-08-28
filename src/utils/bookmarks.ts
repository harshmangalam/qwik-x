import {
  type RequestEventLoader,
  type RequestEventAction,
} from "@builder.io/qwik-city";
import { and, eq, sql } from "drizzle-orm";
import { db } from "~/database/connection";
import { bookmarks } from "~/database/schema";
import { type AuthUser } from "~/types";
import { fetchPostLikesCount, isPostAlreadyLiked } from "./posts";
import { formatDistanceToNowStrict } from "date-fns";

const isAlreadyBookmarked = async (postId: number, userId?: number) => {
  if (!userId) return false;
  const [result] = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.postId, postId)));

  if (result.count) return true;
  return false;
};

const deleteBookmark = async (postId: number, userId: number) => {
  await db
    .delete(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.postId, postId)));
};

const createBookmark = async (postId: number, userId: number) => {
  const result = await db
    .insert(bookmarks)
    .values({ postId, userId })
    .returning();
  return result[0];
};

const handleBookmark = async (
  { postId }: { postId: number },
  { redirect, url, sharedMap }: RequestEventAction
) => {
  const currentUser = sharedMap.get("user") as AuthUser | undefined;
  if (!currentUser) throw redirect(308, "/login");

  const exists = await isAlreadyBookmarked(postId, currentUser.id);
  if (exists) {
    await deleteBookmark(postId, currentUser.id);
  } else {
    await createBookmark(postId, currentUser.id);
  }
  throw redirect(302, url.pathname);
};

const fetchBookmarksCount = async (postId: number) => {
  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(bookmarks)
    .where(eq(bookmarks.postId, postId));

  return result.count;
};

const fetchBookmarkedPosts = async ({
  sharedMap,
  redirect,
}: RequestEventLoader) => {
  const currentUser = sharedMap.get("user") as AuthUser | undefined;
  if (!currentUser) throw redirect(308, "/login");
  const bookmarks = await db.query.bookmarks.findMany({
    where(fields, { eq }) {
      return eq(fields.userId, currentUser.id);
    },
    with: {
      post: {
        with: {
          author: true,
        },
      },
    },
  });

  const formattedPosts = [];

  for (const bookmark of bookmarks) {
    const post = bookmark.post;
    formattedPosts.push({
      ...post,
      isLiked: await isPostAlreadyLiked(post.id, currentUser.id),
      createdAt: formatDistanceToNowStrict(post.createdAt),
      likesCount: await fetchPostLikesCount(post.id),
    });
  }

  return formattedPosts;
};

export {
  handleBookmark,
  fetchBookmarksCount,
  isAlreadyBookmarked,
  fetchBookmarkedPosts,
};
