Main[$.FILENAME] = 'packages/svelte/tests/snapshot/samples/check-shadow-css/main.svelte';

import * as $ from 'svelte/internal/server';

function Main($$renderer, $$props) {
	$$renderer.component(
		($$renderer) => {
			$$renderer.push(`<div class="box svelte-nuxm4g">`);
			$.push_element($$renderer, 'div', 1, 0);
			$$renderer.push(`</div>`);
			$.pop_element();
		},
		Main
	);
}

Main.render = function () {
	throw new Error('Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information');
};

export default Main;