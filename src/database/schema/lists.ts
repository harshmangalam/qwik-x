import { type InferModel, relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import {
  usersListsFollowers,
  usersListsMembers,
  usersListsPinned,
} from "./users-to-lists";

export const lists = pgTable("lists", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 25 }).notNull(),
  description: varchar("description", { length: 100 }),
  isPrivate: boolean("is_private").default(false).notNull(),
  ownerId: integer("owner_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const listsRelations = relations(lists, ({ one, many }) => ({
  owner: one(users, {
    fields: [lists.ownerId],
    references: [users.id],
    relationName: "listsOwner",
  }),
  members: many(usersListsMembers),
  pinned: many(usersListsPinned),
  followers: many(usersListsFollowers),
}));

export type List = InferModel<typeof lists, "select">;
export type NewList = InferModel<typeof lists, "insert">;
