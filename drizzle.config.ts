import {defineConfig} from "drizzle-kit"

if (!process.env.DATABASE_URL){
    throw new Error('The DATABASE_URL env is required')
}

export default defineConfig({
dialect: "postgresql",
dbCredentials: {
  url: process.env.DATABASE_URL
},
  out: "./Drizzle",
  schema: "./src/database/schema.ts",
});
