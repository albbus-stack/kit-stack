import type { Preview } from '@storybook/svelte';
import { withThemeByDataAttribute } from '@storybook/addon-styling';

import '../src/global.css';
import '@fontsource/montserrat-alternates';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		}
	}
};

export default preview;
