import { router } from './trpc';
import { helloRouter } from './routes/hello';
import { dbRouter } from './routes/db';
import { paymentsRouter } from './routes/payments';

export const appRouter = router({
	hello: helloRouter,
	db: dbRouter,
	payments: paymentsRouter
});

export type Router = typeof appRouter;
