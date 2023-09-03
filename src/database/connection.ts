import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema";

console.log("process.env:::", process.env);
console.log("POSTGRES_DATABASE:::", {
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
});

export const db = drizzle(sql, { schema });
