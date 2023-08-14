import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { type InferModel } from "drizzle-orm";
export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 50 }).notNull(),
  username: text("username", { length: 15 }).notNull(),
  email: text("email", { length: 255 }).notNull(),
  password: text("password", { length: 255 }).notNull(),
  online: integer("online", { mode: "boolean" }).default(false).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(new Date()),
});

export type User = InferModel<typeof users, "select">;
export type NewUser = InferModel<typeof users, "insert">;
