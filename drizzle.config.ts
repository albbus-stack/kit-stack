import type { Config } from "drizzle-kit";
 
export default {
  schema: "./src/lib/db/drizzle/schema.ts",
  out: "./src/lib/db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  }
} satisfies Config;