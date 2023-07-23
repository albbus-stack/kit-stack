import { prisma } from '$lib/db';
import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';

export async function createContext(event: RequestEvent) {
	const getUser = async () => {
		const session = await event.locals.getSession();
		if (!session) return null;

		return session.user.id;
	};

	return {
		prisma,
		user: await getUser()
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
