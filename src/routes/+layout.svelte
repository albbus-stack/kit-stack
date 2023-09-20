<script lang="ts">
	import '@fontsource/montserrat-alternates';
	import '../global.css';
	
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing'

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

		return () => subscription.unsubscribe();
	});
</script>

{#key data.url}
	<div in:fly={{ easing: cubicOut, duration: 250, delay: 350, y: 10 }} out:fly={{easing: cubicIn, duration: 250, y:-10 }}>
		<slot />
	</div>
{/key}
