<script lang="ts">
	import type { PageData } from '../../routes/$types';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import * as z from 'zod';

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

	// This defines the form schema for felte
	const formSchema = z.object({
		email: z.string().email().nonempty({
			message: 'Email is required'
		}),
		password: z.string().min(8, {
			message: 'Password must be at least 8 characters long'
		})
	});

	let submitError: string = '';
	let actionType: 'signup' | 'signin' | 'signout' | 'demo' = 'signup';

	// This creates the form, handling validation, submission and error reporting
	const { form } = createForm<z.infer<typeof formSchema>>({
		extend: [validator({ schema: formSchema }), reporter],
		onSubmit: async (values) => {
			let res;
			if (actionType === 'signup') {
				res = await handleSignUp(values.email, values.password);
			} else if (actionType === 'signin') {
				res = await handleSignIn(values.email, values.password);
			} else if (actionType === 'signout') {
				res = await handleSignOut();
			}

			if (res?.error) {
				submitError = res.error.message;
			} else {
				submitError = '';
			}
		},
		onError: (errors) => {
			if (errors instanceof Error) submitError = errors.message;
		}
	});

	// We need to assing these on every re-render
	let user = data.session?.user?.email;
	let { supabase } = data;

	$: {
		({ supabase } = data);
		user = data.session?.user?.email;
	}

	const handleSignUp = async (email: string, password: string) => {
		return await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`
			}
		});
	};

	const handleSignIn = async (email: string, password: string) => {
		return await supabase.auth.signInWithPassword({
			email,
			password
		});
	};

	// The sign out doesn't need schema validation
	const handleSignOut = async () => {
		const res = await supabase.auth.signOut();
		if (!res.error) {
			submitError = '';
		}
	};
</script>

<div class="card items-center p-5">
	<h6 class="mb-8 text-xl font-bold">{title}</h6>
	{#if type !== 'signout'}
		<form class="card items-center gap-4" use:form>
			<input name="email" class="input border-black/50 dark:border-white/50" />

			<ValidationMessage for="email" let:messages={message}>
				<span class="text-red-500">{message || ''}</span>
			</ValidationMessage>

			<input type="password" name="password" class="input border-black/50 dark:border-white/50" />

			<ValidationMessage for="password" let:messages={message}>
				<span class="text-red-500">{message || ''}</span>
			</ValidationMessage>

			<div class="mt-5 flex flex-col gap-5 sm:flex-row">
				{#if type === 'signup' || type === 'demo'}
					<button class="btn btn-primary" on:click={() => (actionType = 'signup')}>Sign up</button>
				{/if}
				{#if type === 'signin' || type === 'demo'}
					<button class="btn btn-info" on:click={() => (actionType = 'signin')}>Sign in</button>
				{/if}
				{#if type === 'demo'}
					<button class="btn btn-warning" on:click|preventDefault={handleSignOut}>Sign out</button>
				{/if}
			</div>
			<span class="mt-2 text-red-500">{submitError}</span>
		</form>
	{:else}
		<button class="btn btn-primary" on:click|preventDefault={handleSignOut}>Sign out</button>
	{/if}
</div>

<h6 class="text-center">User: {user}</h6>
