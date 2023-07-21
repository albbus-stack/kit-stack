import { router } from './trpc';
import { helloRouter } from './routes/hello';
import { dbRouter } from './routes/db';

export const appRouter = router({
	hello: helloRouter,
	db: dbRouter
});

export type Router = typeof appRouter;
