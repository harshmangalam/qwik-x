import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const DRIZZLE_DATABASE_URL = process.env["DRIZZLE_DATABASE_URL"] as string;
const isProd = process.env["NODE_ENV"] === "production";

export default {
  schema: "./src/database/schema/*",
  driver: "pg",
  out: "./migrations",
  dbCredentials: {
    connectionString: DRIZZLE_DATABASE_URL,
    ssl: isProd,
  },
} satisfies Config;
