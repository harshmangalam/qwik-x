import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { posts } from "./posts";
import { relations } from "drizzle-orm";

export const postsLikes = pgTable(
  "posts_likes",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.postId),
  })
);

export const postsLikesRelations = relations(postsLikes, ({ one }) => ({
  post: one(posts, {
    fields: [postsLikes.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [postsLikes.userId],
    references: [users.id],
  }),
}));
