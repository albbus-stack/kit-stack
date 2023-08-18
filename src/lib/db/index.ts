import { PrismaClient } from '@prisma/client';

// Initialize prisma
export const prisma: PrismaClient = new PrismaClient({
	log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});

export * from '@prisma/client';
