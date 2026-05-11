import { test } from '../../assert';

const tick = () => Promise.resolve();

export default test({
	per_file_custom_element: true,
	compileOptions: { dev: true },
	async test({ assert, target }) {
		/** @type {string[]} */
		const warnings = [];
		const original = console.warn;
		console.warn = (...args) => {
			warnings.push(args.join(' '));
		};

		try {
			target.innerHTML = '<nested-css-host></nested-css-host>';
			await tick();
			await tick();

			const host = /** @type {any} */ (target.querySelector('nested-css-host'));
			const dot = host.shadowRoot.querySelector('.dot');
			assert.ok(dot, 'inner div should render');

			const warning = warnings.find((w) => w.includes('shadow_css_missing'));
			assert.ok(warning, `expected shadow_css_missing warning, got: ${warnings.join('\n')}`);
		} finally {
			console.warn = original;
		}
	}
});
