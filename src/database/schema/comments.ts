import { type InferModel, relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { users } from "./users";

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: integer("author_id").notNull(),
  postId: integer("post_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
    relationName: "postsToComments",
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
    relationName: "usersToComments",
  }),
}));

export type Comment = InferModel<typeof comments, "select">;
export type NewComment = InferModel<typeof comments, "insert">;
