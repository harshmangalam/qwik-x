import {
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations, type InferModel } from "drizzle-orm";

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  bio: varchar("bio", { length: 160 }),
  cover: json("cover"),
  category: text("category"),
  location: varchar("location", { length: 280 }),
  dob: timestamp("dob"),
  link: text("link"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(users, {
    fields: [profile.userId],
    references: [users.id],
    relationName: "usersToProfile",
  }),
}));
export type Profile = InferModel<typeof profile, "select">;
export type NewProfile = InferModel<typeof profile, "insert">;
