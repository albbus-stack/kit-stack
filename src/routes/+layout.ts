import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoadEvent } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, data, depends, url }: LayoutLoadEvent) => {
	depends('supabase:auth');

	// Initialize supabase
	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data?.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	if(!url.pathname.split("/")[1]){
		throw redirect(302, '/en');
	}

	const locale = url.pathname.split("/")[1];
	const localeUrl = "/" + locale;

	return { supabase, session, locale, localeUrl, url: url.pathname };
};
