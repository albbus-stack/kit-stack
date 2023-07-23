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
					...require('daisyui/src/theming/themes')['[data-theme=light]'],
					primary: '#f5602f',
					'primary-content': '#ffffff'
				},
				dark: {
					...require('daisyui/src/theming/themes')['[data-theme=dark]'],
					primary: '#f5602f'
				}
			}
		]
	}
};
