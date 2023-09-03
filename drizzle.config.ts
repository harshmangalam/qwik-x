import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export default {
  schema: "./src/database/schema/*",
  driver: "pg",
  out: "./migrations",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
    ssl: true,
  },
} satisfies Config;
