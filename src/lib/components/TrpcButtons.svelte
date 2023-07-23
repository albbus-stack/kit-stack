<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { TRPCClientError } from '@trpc/client';

	let greeting = 'Press the button to load data';
	let authedGreeting = 'Press the button to load data';

	let loading = false;
	let authedLoading = false;

	const loadQuery = async () => {
		loading = true;
		try {
			greeting = await trpc($page).hello.greeting.query();
		} catch (e) {
			if (e instanceof TRPCClientError) {
				greeting = e.message;
			}
		} finally {
			loading = false;
		}
	};

	const loadAuthedQuery = async () => {
		authedLoading = true;
		try {
			authedGreeting = await trpc($page).db.greeting.query();
		} catch (e) {
			if (e instanceof TRPCClientError) {
				authedGreeting = e.message;
			}
		} finally {
			authedLoading = false;
		}
	};
</script>

<div class="card flex-col gap-10 sm:flex-row">
	<div class="card min-w-[250px] flex-col items-center gap-5">
		<a
			href="#load"
			role="button"
			class="btn btn-primary w-full"
			aria-busy={loading}
			on:click|preventDefault={loadQuery}>Load</a
		>
		<p>{loading ? 'Loading...' : greeting}</p>
	</div>
	<div class="card min-w-[250px] flex-col items-center gap-5">
		<a
			href="#load"
			role="button"
			class="btn btn-primary w-full"
			aria-busy={loading}
			on:click|preventDefault={loadAuthedQuery}>Load Authed</a
		>
		<p>{authedLoading ? 'Loading...' : authedGreeting}</p>
	</div>
</div>
