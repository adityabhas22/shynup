#!/usr/bin/env node

/**
 * Simple script to help set up the database
 * Run this after setting up your DATABASE_URL in .env
 */

import { config } from "dotenv";
import postgres from "postgres";

// Load environment variables
config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL environment variable is required");
  console.log("\n📝 Please create a .env file with your database URL:");
  console.log("echo 'DATABASE_URL=\"your_neon_db_connection_string\"' > .env");
  console.log(
    "\n🔗 Get your connection string from Neon Dashboard → Connection Details",
  );
  console.log(
    "📋 Example format: postgresql://username:password@hostname/database?sslmode=require",
  );
  process.exit(1);
}

console.log("🔄 Testing database connection...");

try {
  // Test connection
  const sql = postgres(connectionString, { max: 1 });

  await sql`SELECT 1 as test`;

  console.log("✅ Database connection successful!");
  console.log("📋 Next steps:");
  console.log("1. Run: npm run db:push");
  console.log("2. This will create the service_requests table");
  console.log("3. Then start your app: npm run dev");

  await sql.end();
} catch (error) {
  console.error("❌ Database connection failed:", error.message);
  console.log("\n🔧 Troubleshooting:");
  console.log("1. Check your DATABASE_URL in .env file");
  console.log("2. Ensure your Neon DB allows connections from your IP");
  console.log("3. Verify SSL mode is set to 'require'");
  console.log("4. Make sure your database credentials are correct");
  process.exit(1);
}
