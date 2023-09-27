import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { lists } from "./lists";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const usersListsPinned = pgTable(
  "users_lists_pinned",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    listId: integer("list_id")
      .notNull()
      .references(() => lists.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.listId),
  })
);

export const usersListsPinnedRelations = relations(
  usersListsPinned,
  ({ one }) => ({
    list: one(lists, {
      fields: [usersListsPinned.listId],
      references: [lists.id],
    }),
    user: one(users, {
      fields: [usersListsPinned.userId],
      references: [users.id],
    }),
  })
);
