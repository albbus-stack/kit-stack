<script lang="ts">
	import type { PageData } from '../../routes/$types';

	export let data: PageData;
	export let type: 'signup' | 'signin' | 'signout' | 'demo';

	let title =
		type === 'signup'
			? 'Sign up'
			: type === 'signin'
			? 'Sign in'
			: type === 'signout'
			? 'Sign out'
			: 'Sign up & Login';

	let user = data.session?.user?.email;
	let { supabase } = data;

	$: {
		({ supabase } = data);
		user = data.session?.user?.email;
	}

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

<div class="card mt-20 items-center p-5">
	<h6 class="mb-8 text-xl font-bold">{title}</h6>
	{#if type !== 'signout'}
		<form class="card items-center gap-4" on:submit={handleSignUp}>
			<input name="email" bind:value={email} class="input border-white/50" />
			<input type="password" name="password" bind:value={password} class="input border-white/50" />
			<div class="mt-5 flex flex-col gap-5 sm:flex-row">
				{#if type === 'signup' || type === 'demo'}
					<button class="btn btn-primary">Sign up</button>
				{/if}
				{#if type === 'signin' || type === 'demo'}
					<button class="btn btn-primary" on:click|preventDefault={handleSignIn}>Sign in</button>
				{/if}
				{#if type === 'demo'}
					<button class="btn btn-primary" on:click|preventDefault={handleSignOut}>Sign out</button>
				{/if}
			</div>
		</form>
	{:else}
		<button class="btn btn-primary" on:click|preventDefault={handleSignOut}>Sign out</button>
	{/if}
</div>

<h6 class="text-center">User: {user}</h6>
