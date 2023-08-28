import type { Preview } from '@storybook/svelte';

import { withThemeByDataAttribute } from "@storybook/addon-styling";

import '../src/global.css';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		}
	},

	decorators: [
		withThemeByDataAttribute({
		themes: {
      		light: "light",
	      	dark: "dark",
	    },
	    defaultTheme: "dark",
	    attributeName: "data-theme",
	  }),
	]
};

export default preview;
