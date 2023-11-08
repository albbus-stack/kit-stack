<script lang="ts">
	import { disableScrollHandling } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		disableScrollHandling();
	});
</script>

<slot />
