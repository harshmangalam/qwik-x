import * as schema from "./schema";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env["DRIZZLE_DATABASE_URL"] as string);
export const db = drizzle(sql, { schema });
