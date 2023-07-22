import { protectedProcedure, router } from '../trpc';

export const dbRouter = router({
	greeting: protectedProcedure.query(async ({ ctx }) => {
		const { prisma } = ctx;
		const users = await prisma.user.findMany();

		console.log('All Users:', users);

		return `Hello from the authed db`;
	})
});
