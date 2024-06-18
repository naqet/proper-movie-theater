import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const client = new Database("./sqlite.db")
export const db = drizzle(client)