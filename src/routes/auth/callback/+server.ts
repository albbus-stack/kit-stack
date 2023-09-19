import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { user } from '$lib/db/drizzle/schema';

// Handles the callback from the OAuth provider, receiving a certain code that can be exhanged for a session
export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	const userData = (await supabase.auth.getUser()).data;

	if (!userData?.user?.email) throw redirect(302, '/');

	await db.insert(user).values({
		email: userData.user.email,
		id: userData.user.id
	});

	throw redirect(301, '/');
};
