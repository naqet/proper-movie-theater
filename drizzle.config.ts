import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  dbCredentials: {
      url: "./src/db/sqlite.db",
      authToken: process.env.AUTH_SECRET,
  },
  out: "./drizzle",
});

