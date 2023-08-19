<script>
	import { ArrowLeft, Icon } from 'svelte-hero-icons';
	import { disableScrollHandling } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		disableScrollHandling();
	});
</script>

<div class="flex h-screen w-screen flex-col items-center gap-10 p-10">
	<a href="/" role="button" class="btn btn-primary self-start">
		<Icon class="w-7" src={ArrowLeft} />
	</a>
	<b class="text-xl">A protected page</b>
</div>
