<script lang="ts">
	import LoginForm from '$lib/components/LoginForm.svelte';
	import TrpcButtons from '$lib/components/TrpcButtons.svelte';

	export let data;
</script>

<img src="/logo.svg" alt="kit-stack logo" class="mx-auto mt-16" />

<div class="card mx-auto my-16 max-w-[70vw] items-center gap-5">
	<h6 class="mb-3 text-xl font-bold">Trpc Query</h6>
	<TrpcButtons />
</div>

<LoginForm {data} type="demo" />

<div class="card mx-auto mb-28 mt-20 items-center gap-5">
	<h6 class="mb-3 text-xl font-bold">Protected Page Route</h6>
	<a href="/protected/" role="button" class="btn btn-primary w-[250px]">secret page</a>
</div>
