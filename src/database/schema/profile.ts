import { json, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
  bio: varchar("bio", { length: 160 }),
  avatar: json("avatar"),
  cover: json("avatar"),
  category: text("category"),
  location: varchar("location", { length: 280 }),
  dob: timestamp("dob"),
  link: text("link"),
});
