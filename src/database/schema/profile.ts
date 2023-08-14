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

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  bio: varchar("bio", { length: 160 }),
  avatar: json("avatar"),
  cover: json("cover"),
  category: text("category"),
  location: varchar("location", { length: 280 }),
  dob: timestamp("dob"),
  link: text("link"),
});
