import { relations } from "drizzle-orm";
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
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
