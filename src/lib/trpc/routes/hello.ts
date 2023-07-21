import { publicProcedure, router } from '../trpc';

export const helloRouter = router({
	greeting: publicProcedure.query(async () => {
		return `Hello from tRPC @ ${new Date().toLocaleTimeString()}`;
	})
});
