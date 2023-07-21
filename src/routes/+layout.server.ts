import type { RequestEvent } from './$types';

export const load = async ({ locals: { getSession } }: RequestEvent) => {
	return {
		session: await getSession()
	};
};
