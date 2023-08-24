<script>
	import { page } from '$app/stores';
</script>

<div class="flex h-screen flex-col items-center justify-center gap-10">
	<img src="/logo.svg" alt="kit-stack logo" class="mx-auto rounded-2xl shadow-lg" />
	<h1 class="text-xl font-bold">{$page.error?.message || ''}</h1>
	<a href="/" role="button" class="btn btn-primary"> Home </a>
</div>
