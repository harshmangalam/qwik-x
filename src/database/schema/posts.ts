import { type InferModel, relations } from "drizzle-orm";
import {
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { postsLikes } from "./posts-likes";
import { bookmarks } from "./bookmarks";

export const visibilityEnum = pgEnum("post_visibility", ["Everyone", "Circle"]);
export const replyPrivacyEnum = pgEnum("post_reply_privacy", [
  "Everyone",
  "Following",
  "Follower",
  "Mention",
]);
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  text: text("text"),
  media: json("media"),
  visibility: visibilityEnum("visibility").default("Everyone"),
  replyPrivacy: replyPrivacyEnum("reply_privacy").default("Everyone"),
  authorId: integer("author_id").notNull(),
  parentPostId: integer("parent_post_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
    relationName: "authorToPosts",
  }),
  parentPost: one(posts, {
    fields: [posts.parentPostId],
    references: [posts.id],
  }),
  postsLikes: many(postsLikes),

  bookmarks: many(bookmarks, {
    relationName: "postsToBookmarks",
  }),
}));

export type Post = InferModel<typeof posts, "select">;
export type NewPost = InferModel<typeof posts, "insert">;
