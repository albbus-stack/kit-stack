<script lang="ts">
	import * as m from '@inlang/paraglide-js/kit-stack/messages';
	import { setLanguageTag, languageTag } from '@inlang/paraglide-js/kit-stack';

	let title = m.title();

	function toggleLanguages() {
		console.log(languageTag());
		console.log(m.title());
		title = m.title();
		if (languageTag() === 'it') setLanguageTag('en');
		else setLanguageTag('it');
	}
</script>

<p>{title}</p>

<button class="btn btn-primary w-[250px]" on:click={toggleLanguages}>
	{languageTag() === 'it' ? 'EN' : 'IT'}
</button>
