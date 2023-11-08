<script lang="ts">
	import * as m from '../../paraglide/messages';
	import LanguageSwitch from './LanguageSwitch.svelte';
	import type { AvailableLanguageTag } from '../../paraglide/runtime';

	export let locale: AvailableLanguageTag;
</script>

<div class="flex flex-col items-center gap-4">
	<p>{m.title()}</p>

	<LanguageSwitch {locale}/>
</div>
