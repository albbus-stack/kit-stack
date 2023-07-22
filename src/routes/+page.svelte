<script lang="ts">
	import { page } from '$app/stores';
	import LoginForm from '$lib/components/LoginForm.svelte';
	import TrpcButtons from '$lib/components/TrpcButtons.svelte';
	import { trpc } from '$lib/trpc/client';
	import { TRPCClientError } from '@trpc/client';

	let greeting = 'Press the button to load data';
	let loading = false;

	const loadQuery = async () => {
		loading = true;
		try {
			greeting = await trpc($page).db.greeting.query();
		} catch (e) {
			if (e instanceof TRPCClientError) {
				greeting = e.message;
			}
		} finally {
			loading = false;
		}
	};

	export let data;
</script>

<div class="card mx-auto mt-20 max-w-[70vw] items-center gap-5">
	<h6 class="mb-3 text-xl font-bold">Trpc Query</h6>
	<TrpcButtons />
</div>

<LoginForm {data} type="demo" />
