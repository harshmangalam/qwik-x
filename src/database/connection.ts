import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "./schema";
const DRIZZLE_DATABASE_URL = process.env["DRIZZLE_DATABASE_URL"] as string;

if (!DRIZZLE_DATABASE_URL)
  throw new Error("DRIZZLE_DATABASE_URL env variable missing");

// for migrations
const migrationClient = postgres(DRIZZLE_DATABASE_URL, { max: 1 });
migrate(drizzle(migrationClient, { schema }), {
  migrationsFolder: "migrations",
});

// for query purposes
const queryClient = postgres(DRIZZLE_DATABASE_URL);
export const db = drizzle(queryClient, { schema });
