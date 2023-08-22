import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const followers = pgTable(
  "followers",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    otherUserId: integer("other_user_id")
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.otherUserId),
  })
);

export const followersRelations = relations(followers, ({ one }) => ({
  user: one(users, {
    fields: [followers.otherUserId],
    references: [users.id],
    relationName: "usersToFollowers",
  }),
}));
