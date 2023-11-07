<script lang="ts">
	import { browser } from '$app/environment';
	import { setLanguageTag, type AvailableLanguageTag } from '@inlang/paraglide-js/kit-stack';
	import { onMount } from 'svelte';

	export let data;

		
</script>

<slot />
