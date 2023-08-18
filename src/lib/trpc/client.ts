import type { Router } from '$lib/trpc/router';
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import superjson from 'superjson';

export function trpc(init?: TRPCClientInit) {
	return createTRPCClient<Router>({
		transformer: superjson,
		init
	});
}
