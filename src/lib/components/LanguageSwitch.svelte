<script lang="ts">
	import { setLanguageTag, type AvailableLanguageTag, availableLanguageTags} from '@inlang/paraglide-js/kit-stack';
	import { browser } from "$app/environment";

    export let locale: AvailableLanguageTag;

    $: setLanguageTag(locale)
</script>

<div class="dropdown dropdown-bottom">
    <button tabindex="0" class="btn m-1 h-14 px-3 text-center">
        <img class="h-8 w-8" src={`https://hatscripts.github.io/circle-flags/flags/${locale === "en" ? "us" : locale}.svg`} alt={locale}/>
    </button>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul tabindex="0" class="dropdown-content z-[1000] p-2 menu shadow bg-base-200 rounded-box gap-1">
        {#each availableLanguageTags as languageTag}
            {#if languageTag !== locale}
                <li>
                    <button
                        on:click={() => {
                            setLanguageTag(languageTag);
			                if(browser) window.location.href = ("/" + languageTag);
                        }} 
                        class="p-2 py-1"
                    >
                        <img class="h-10 w-10" src={`https://hatscripts.github.io/circle-flags/flags/${languageTag === "en" ? "us" : languageTag}.svg`} alt={languageTag}/>
                    </button>
                </li>
            {/if}
        {/each}
    </ul>
</div>
