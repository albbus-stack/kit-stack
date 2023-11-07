<script lang="ts">
	import * as m from '@inlang/paraglide-js/kit-stack/messages';
	import LanguageSwitch from './LanguageSwitch.svelte';
</script>

<div class="flex flex-col items-center gap-4">
	<p>{m.title()}</p>

	<LanguageSwitch />
</div>
