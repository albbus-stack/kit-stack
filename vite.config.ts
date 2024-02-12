import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { paraglide } from '@inlang/paraglide-js-adapter-vite';

export default defineConfig({
	optimizeDeps: {
		exclude: ['@inlang/paraglide-js']
	},
	ssr: {
		noExternal: ['@inlang/paraglide-js']
	},
	plugins: [
		paraglide({
			project: './project.inlang',
			outdir: './src/paraglide'
		}),
		sveltekit()
	]
});
