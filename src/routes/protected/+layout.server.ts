import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';

export async function load({ locals: { getSession } }: RequestEvent) {
	const session = await getSession();
	if (!session) {
		throw redirect(302, '/');
	}
}
