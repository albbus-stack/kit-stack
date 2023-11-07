<script lang="ts">
	import '@fontsource/montserrat-alternates';
	import '../global.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { setLanguageTag, onSetLanguageTag } from '@inlang/paraglide-js/kit-stack';
	import { browser } from '$app/environment';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
			}
			invalidate('supabase:auth');
		});

		const initialLanguage = browser ? window.localStorage.getItem('language') ?? 'en' : 'en';
		setLanguageTag(initialLanguage as any);
		onSetLanguageTag((languageTag) => {
			if (browser) {
				window.localStorage.setItem('language', languageTag);
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

{#key data.url}
	<div
		in:fly={{ easing: cubicOut, duration: 250, delay: 350, y: 10 }}
		out:fly={{ easing: cubicIn, duration: 250, y: -10 }}
	>
		<slot />
	</div>
{/key}
