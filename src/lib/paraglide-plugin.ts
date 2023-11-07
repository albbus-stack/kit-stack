// This is a temporary file until the official 
// svelte-kit adapter for paraglide-js gets released.

import type { PluginOption } from 'vite';
import { exec } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedSettings: any = undefined;

export const paraglideJsVitePlugin = (config: {
	settingsPath: string;
	namespace: string;
	silent?: boolean;
	timeout?: number;
	onInit?: boolean;
}): PluginOption => {
	const options = {
		silent: false,
		timeout: 500,
		onInit: true,
		...config
	};

	let throttled = false;

	const execute = () => {
		exec(
			`paraglide-js compile --namespace ${options.namespace} --project ${options.settingsPath}`,
			(exception, output, error) => {
				if (!options.silent && output) console.log(output);
				if (!options.silent && error) console.error(error);
			}
		);
	};

	return {
		name: 'vite-plugin-paraglide-js-watcher',

		async buildStart() {
			if (!cachedSettings) {
				const settingsContent = await readFile(options.settingsPath, 'utf-8');
				cachedSettings = JSON.parse(settingsContent);
			}

			if (options.onInit) {
				execute();
			}
		},

		async handleHotUpdate({ file }) {
			if (throttled) return;

			throttled = true;

			setTimeout(() => (throttled = false), options.timeout);

			let filePath =
				cachedSettings && (cachedSettings['plugin.inlang.messageFormat']?.filePath as string);
			if (!filePath) {
				console.warn(
					'No `filePath` found in `project.inlang.json` settings. Skipping paraglide-js compilation.'
				);
				return;
			}

			if (!filePath.startsWith('/')) {
				filePath = resolve(process.cwd(), filePath);
			}

			if (file === filePath) {
				console.info(
					'Running',
					`paraglide-js compile --namespace ${options.namespace} --project ${options.settingsPath}`,
					'with filePath:',
					filePath,
					'\n'
				);
				execute();
			}
		}
	};
};
