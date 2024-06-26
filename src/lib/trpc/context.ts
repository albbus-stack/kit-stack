import { SECRET_STRIPE_KEY } from '$env/static/private';
import { db } from '$lib/db';
import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';
import Stripe from 'stripe';

// Initialize stripe
const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: '2024-04-10'
});

export async function createContext(event: RequestEvent) {
	// Fetch the user infos (currently only the id) from the session
	const getUser = async () => {
		const session = await event.locals.getSession();
		if (!session) return null;

		return session.user.id;
	};

	return {
		db,
		stripe,
		user: await getUser()
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
