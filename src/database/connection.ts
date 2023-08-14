import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from "./schema";
const connectionString = import.meta.env.DATABASE_URL;
const client = postgres(connectionString);
export const db = drizzle(client, { schema });

// for migrations
const migrationClient = postgres(connectionString, { max: 1 });
await migrate(drizzle(migrationClient), {
  migrationsFolder: "migrations",
});
