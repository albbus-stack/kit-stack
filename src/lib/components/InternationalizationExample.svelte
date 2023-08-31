<script lang="ts">
	import { i } from '@inlang/sdk-js';
	import { language } from '@inlang/sdk-js';
	import { switchLanguage } from '@inlang/sdk-js';

	async function toggleLanguages() {
		if (language === 'it') await switchLanguage('en');
		else await switchLanguage('it');
	}
</script>

<p>{i('title')}</p>

<button class="btn btn-primary w-[250px]" on:click={toggleLanguages}>
	{language === 'it' ? 'EN' : 'IT'}
</button>
