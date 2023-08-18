import { PrismaClient } from '@prisma/client';

export const prisma: PrismaClient = new PrismaClient({
	log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});

export * from '@prisma/client';
