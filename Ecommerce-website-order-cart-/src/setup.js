#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔧 Checking Prisma client...");

const prismaDir = path.join(
  __dirname,
  "..",
  "node_modules",
  ".prisma",
  "client",
);
const schemaPath = path.join(__dirname, "..", "prisma", "schema.prisma");

if (!fs.existsSync(prismaDir)) {
  console.log("⚠️  Prisma client not found, generating...");
  try {
    execSync("npx prisma generate --schema=../prisma/schema.prisma", {
      stdio: "inherit",
    });
    console.log("✅ Prisma client generated successfully");
  } catch (error) {
    console.error("❌ Failed to generate Prisma client:", error.message);
    process.exit(1);
  }
} else {
  console.log("✅ Prisma client already exists");
}
