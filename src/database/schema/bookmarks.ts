import { relations, type InferModel } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { posts } from "./posts";

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  postId: integer("post_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  user: one(users, {
    relationName: "usersToBookmarks",
    fields: [bookmarks.userId],
    references: [users.id],
  }),
  post: one(posts, {
    relationName: "postsToBookmarks",
    fields: [bookmarks.postId],
    references: [posts.id],
  }),
}));

export type Bookmark = InferModel<typeof bookmarks, "select">;
export type NewBookmark = InferModel<typeof bookmarks, "insert">;
