import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

import * as schema from "./schema";
const DRIZZLE_DATABASE_URL = process.env["DRIZZLE_DATABASE_URL"] as string;

if (!DRIZZLE_DATABASE_URL)
  throw new Error("DRIZZLE_DATABASE_URL env variable missing");

const sql = neon(DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql, { schema });
