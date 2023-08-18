import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';

// This is a protected route, so we need to check if the user is logged in, otherwise we redirect
export async function load({ locals: { getSession } }: RequestEvent) {
	const session = await getSession();
	if (!session) {
		throw redirect(302, '/');
	}
}
