<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';

	let greeting = 'press the button to load data';
	let loading = false;

	const loadData = async () => {
		loading = true;
		greeting = await trpc($page).greeting.query();
		loading = false;
	};
</script>

<div class="card gap-5 items-center max-w-[70vw] mx-auto mt-[50vh] -translate-y-[50%]">
	<h6>Loading data in <code>+page.svelte</code></h6>

	<a
		href="#load"
		role="button"
		class="btn btn-primary"
		aria-busy={loading}
		on:click|preventDefault={loadData}>Load</a
	>
	<p>{greeting}</p>
</div>
