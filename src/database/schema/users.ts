import {
  boolean,
  json,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations, type InferModel } from "drizzle-orm";
import { profile } from "./profile";
import { posts } from "./posts";
export const usersRole = pgEnum("users_role", ["User", "Admin"]);
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  username: varchar("username", { length: 15 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  avatar: json("avatar").notNull(),
  role: usersRole("role").default("User").notNull(),
  online: boolean("online").default(false).notNull(),
  lastSeen: timestamp("last_seen").defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profile, {
    fields: [users.id],
    references: [profile.userId],
  }),
  posts: many(posts),
}));

export type User = InferModel<typeof users, "select">;
export type NewUser = InferModel<typeof users, "insert">;
