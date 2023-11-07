import { paraglideJsVitePlugin } from './src/lib/paraglide-plugin';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	optimizeDeps: {
		exclude: ['@inlang/paraglide-js']
	},
	ssr: {
		noExternal: ['@inlang/paraglide-js']
	},
	plugins: [
		sveltekit(),
		paraglideJsVitePlugin({
			namespace: "kit-stack",
			settingsPath: "./project.inlang.json",
		}),
	],
});
