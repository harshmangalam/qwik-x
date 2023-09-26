import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
const DRIZZLE_DATABASE_URL = process.env["DRIZZLE_DATABASE_URL"] as string;

if (!DRIZZLE_DATABASE_URL)
  throw new Error("DRIZZLE_DATABASE_URL env variable missing");

// for query purposes
const queryClient = postgres(DRIZZLE_DATABASE_URL);
export const db = drizzle(queryClient, { schema });
