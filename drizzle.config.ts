import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./lib/server/schema.ts",
  out: "./drizzle",
});

