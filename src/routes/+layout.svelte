<script lang="ts">
	import "@fontsource/montserrat-alternates";
	import "../global.css";

	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import { cubicIn, cubicOut } from "svelte/easing";
	import { setLanguageTag, onSetLanguageTag, type AvailableLanguageTag } from "@inlang/paraglide-js/kit-stack";
	import { browser } from "$app/environment";

	export let data;
	let languageTag: AvailableLanguageTag;
	let isLoading = true;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
			}
			invalidate("supabase:auth");
		});

		languageTag = browser ? window.localStorage.getItem("language") as AvailableLanguageTag ?? "en" : "en";
		setLanguageTag(languageTag);
		onSetLanguageTag((lang) => {
			if (browser) {
				languageTag = lang
				window.localStorage.setItem("language", lang);
			}
		});
		isLoading = false;

		return () => subscription.unsubscribe();
	});
</script>

{#if isLoading}
	<div class="min-h-screen min-w-screen flex justify-center items-center">
		<span class="loading loading-spinner loading-lg"></span>
	</div>
{:else}
	{#key data.url + languageTag}
		<div
			in:fly={{ easing: cubicOut, duration: 250, delay: 350, y: 10 }}
			out:fly={{ easing: cubicIn, duration: 250, y: -10 }}
		>
			<slot />
		</div>
	{/key}
{/if}
