import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Database connection
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create the connection
const client = postgres(connectionString, {
  max: 1, // For serverless environments, use max: 1
});

// Create the database instance
export const db = drizzle(client, { schema });

// Export the client for cleanup if needed
export { client };
