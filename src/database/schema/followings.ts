import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const followings = pgTable(
  "followings",
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

export const followingsRelations = relations(followings, ({ one }) => ({
  user: one(users, {
    fields: [followings.userId],
    references: [users.id],
    relationName: "usersToFollowings",
  }),
}));
