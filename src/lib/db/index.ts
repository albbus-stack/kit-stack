import { drizzle } from "drizzle-orm/postgres-js"
import { DATABASE_URL } from "$env/static/private";
import * as schema from './drizzle/schema';
import postgres from "postgres"
 
const client = postgres(DATABASE_URL)

// This is a bug in the drizzle types against the postgres ones
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = drizzle(client as any, { schema });