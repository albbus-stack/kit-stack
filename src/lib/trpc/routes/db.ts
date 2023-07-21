import { publicProcedure, router } from '../trpc';

export const dbRouter = router({
	greeting: publicProcedure.query(async ({ ctx }) => {
		const { prisma } = ctx;
		const users = await prisma.user.findMany();
		console.log(users);

		return `Hello from the db`;
	})
});
