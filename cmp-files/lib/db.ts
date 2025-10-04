// src/db.ts
import { PrismaClient } from '$/src/generated/prisma';

// This is a global variable to ensure that in development,
// the PrismaClient is not instantiated multiple times due to hot-reloading.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // You can add PrismaClient options here, e.g., logging
    // log: ['query', 'info', 'warn', 'error'],
  });



if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}