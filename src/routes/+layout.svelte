<script lang="ts">
	import '@fontsource/montserrat-alternates';
	import '../global.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

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
	<div in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}>
		<slot />
	</div>
{/key}
