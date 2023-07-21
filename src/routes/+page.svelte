<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { TRPCClientError } from '@trpc/client';

	let greeting = 'Press the button to load data';
	let loading = false;

	const loadQuery = async () => {
		loading = true;
		try {
			greeting = await trpc($page).db.greeting.query();
		} catch (e) {
			if (e instanceof TRPCClientError) {
				greeting = e.message;
			}
		} finally {
			loading = false;
		}
	};

	export let data;

	let user = data.session?.user?.email;
	let { supabase } = data;
	$: ({ supabase, session } = data);
	$: user = data.session?.user?.email;

	let email: string;
	let password: string;

	const handleSignUp = async () => {
		await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`
			}
		});
	};

	const handleSignIn = async () => {
		await supabase.auth.signInWithPassword({
			email,
			password
		});
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};
</script>

<div class="card gap-5 items-center max-w-[70vw] mx-auto mt-20">
	<h6 class="mb-3 font-bold text-xl">Trpc Query</h6>
	<a
		href="#load"
		role="button"
		class="btn btn-primary"
		aria-busy={loading}
		on:click|preventDefault={loadQuery}>Load</a
	>
	<p>{greeting}</p>
</div>

<form class="card p-5 items-center gap-4 mt-20" on:submit={handleSignUp}>
	<h6 class="mb-3 font-bold text-xl">Signup & Login</h6>
	<input name="email" bind:value={email} class="input border-white/50" />
	<input type="password" name="password" bind:value={password} class="input border-white/50" />
	<div class="flex flex-col sm:flex-row gap-5 mt-5">
		<button class="btn btn-primary">Sign up</button>
		<button class="btn btn-primary" on:click|preventDefault={handleSignIn}>Sign in</button>
		<button class="btn btn-primary" on:click|preventDefault={handleSignOut}>Sign out</button>
	</div>
</form>

<h6 class="text-center">User: {user}</h6>
