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

export const usersListsMembers = pgTable(
  "users_lists_members",
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

export const usersListsMembersRelations = relations(
  usersListsMembers,
  ({ one }) => ({
    list: one(lists, {
      fields: [usersListsMembers.listId],
      references: [lists.id],
    }),
    user: one(users, {
      fields: [usersListsMembers.userId],
      references: [users.id],
    }),
  })
);

export const usersListsFollowers = pgTable(
  "users_lists_followers",
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

export const usersListsFollowersRelations = relations(
  usersListsFollowers,
  ({ one }) => ({
    list: one(lists, {
      fields: [usersListsFollowers.listId],
      references: [lists.id],
    }),
    user: one(users, {
      fields: [usersListsFollowers.userId],
      references: [users.id],
    }),
  })
);
