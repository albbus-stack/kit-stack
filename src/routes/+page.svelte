<script lang="ts">
	import LoginForm from '$lib/components/LoginForm.svelte';
	import TrpcButtons from '$lib/components/TrpcButtons.svelte';
	import InternationalizationExample from '$lib/components/InternationalizationExample.svelte';
	import Seo from 'sk-seo';

	export let data;
</script>

<Seo title="Kit-Stack Demo" description="Demo webpage for Kit-Stack" />

<img src="/logo.svg" alt="kit-stack logo" class="mx-auto mt-16 rounded-2xl shadow-lg" />

<div class="card mx-auto my-16 max-w-[70vw] items-center gap-5">
	<h6 class="mb-3 select-none text-xl font-bold">Trpc Queries</h6>
	<TrpcButtons />
</div>

<LoginForm {data} type="demo" />

<div class="card mx-auto mb-20 mt-20 items-center gap-5">
	<h6 class="mb-3 select-none text-xl font-bold">Protected Page Route</h6>
	<a href="/protected" role="button" class="btn btn-primary w-[250px]">Secret Page</a>
</div>

<div class="card mx-auto mb-20 mt-20 items-center gap-5">
	<h6 class="mb-3 select-none text-xl font-bold">Stripe Payment Example</h6>
	<a href="/payment-example" role="button" class="btn btn-info w-[250px]">Stripe</a>
</div>

<div class="card mx-auto mb-20 mt-20 items-center gap-5">
	<h6 class="mb-3 select-none text-xl font-bold">Posts CRUD example</h6>
	<a href="/posts-example" role="button" class="btn btn-success w-[250px]">Posts</a>
</div>

<div class="card mx-auto mb-28 mt-20 items-center gap-5">
	<h6 class="mb-3 select-none text-xl font-bold">Internationalization</h6>
	<InternationalizationExample />
</div>
