/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],
					primary: '#f5602f',
					'primary-content': '#ffffff',
					'secondary-content': '#ffffff',
					'accent-content': '#ffffff',
					'success-content': '#ffffff',
					'info-content': '#ffffff',
					'warning-content': '#ffffff',
					'error-content': '#ffffff',
				},
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					primary: '#f5602f',
					'primary-content': '#ffffff',
					'secondary-content': '#ffffff',
					'accent-content': '#ffffff',
					'success-content': '#ffffff',
					'info-content': '#ffffff',
					'warning-content': '#ffffff',
					'error-content': '#ffffff',
				}

			}
		]
	}
};
