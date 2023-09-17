import * as schema from "./schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
const pool = new Pool();
const client = await pool.connect();
export const db = drizzle(client, { schema });
