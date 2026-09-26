import { PrismaClient } from "@prisma/client";

// Lesson 62 — one PrismaClient for the whole app.
// In dev, Next reloads this file often. Stashing the client on globalThis
// stops each reload from opening another database connection.
const globalForPrisma = globalThis as unknown as {
  db: PrismaClient | undefined;
};

export const db =
  globalForPrisma.db ??
  new PrismaClient({
    // Lesson 115 — Multiple Repeated DB Queries: print every SQL statement
    // in the dev terminal. One line is one round trip. A post page should
    // show the comment SELECT a single time.
    log: process.env.NODE_ENV === "production" ? [] : ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.db = db;
}
