<script lang="ts">
	import { setLanguageTag, languageTag, type AvailableLanguageTag, availableLanguageTags} from '$paraglide/runtime';

	let lang: AvailableLanguageTag = languageTag()

	$: setLanguageTag(languageTag)
</script>

<div class="dropdown dropdown-bottom">
    <button tabindex="0" class="btn m-1 h-14 px-3 text-center">
        <img class="h-8 w-8" src={`https://hatscripts.github.io/circle-flags/flags/${lang === "en" ? "us" : lang}.svg`} alt={lang}/>
    </button>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul tabindex="0" class="dropdown-content z-[1000] p-2 menu shadow bg-base-200 rounded-box gap-1">
        {#each availableLanguageTags as languageTag}
            {#if languageTag !== lang}
                <li>
                    <button
                        on:click={() => {
                            setLanguageTag(languageTag)
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
