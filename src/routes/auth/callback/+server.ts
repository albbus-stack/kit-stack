import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	const user = await supabase.auth.getUser();

	if (!user.data?.user?.email) throw redirect(303, '/');

	await new PrismaClient().user.create({
		data: {
			email: user.data?.user?.email,
			id: user.data?.user?.id
		}
	});

	throw redirect(303, '/');
};
