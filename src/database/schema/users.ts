import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations, type InferModel } from "drizzle-orm";
import { profile } from "./profile";
export const usersRole = pgEnum("users_role", ["User", "Admin"]);
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  username: varchar("username", { length: 15 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  online: boolean("online").default(false).notNull(),
  role: usersRole("role").default("User").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profile, {
    fields: [users.id],
    references: [profile.userId],
  }),
}));

export type User = InferModel<typeof users, "select">;
export type NewUser = InferModel<typeof users, "insert">;
