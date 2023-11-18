/* eslint-disable @typescript-eslint/no-explicit-any */
// This is a temporary file until the official
// svelte-kit adapter for paraglide-js gets released.

import { exec } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

let cachedSettings: any = undefined;

export const paraglideJsVitePlugin = (config: any) => {
	const options = {
		silent: false,
		timeout: 500,
		onInit: true,
		...config
	};

	let throttled = false;

	const execute = () => {
		exec(`paraglide-js compile --project ${options.settingsPath}`, (_, output, error) => {
			if (!options.silent && output) console.log(output);
			if (!options.silent && error) console.error(error);
		});
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

		async handleHotUpdate({ file }: { file: string }) {
			if (throttled) return;

			throttled = true;

			setTimeout(() => (throttled = false), options.timeout);

			let filePath: string =
				cachedSettings && cachedSettings['plugin.inlang.messageFormat']?.pathPattern;
			filePath = filePath.replace('{languageTag}.json', '');

			if (!filePath) {
				console.warn(
					'No `pathPattern` found in `project.inlang.json` settings. Skipping paraglide-js compilation.'
				);
				return;
			}

			if (!filePath.startsWith('/')) {
				filePath = resolve(process.cwd(), filePath);
			}

			if (file.slice(0, file.lastIndexOf('/')) === filePath) {
				execute();
			}
		}
	};
};
