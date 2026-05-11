import 'svelte/internal/disclose-version';
import 'svelte/internal/flags/legacy';

Main[$.FILENAME] = 'packages/svelte/tests/snapshot/samples/check-shadow-css/main.svelte';

import * as $ from 'svelte/internal/client';

var root = $.add_locations($.from_html(`<div class="box svelte-nuxm4g"></div>`), Main[$.FILENAME], [[1, 0]]);

export default function Main($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, false, Main);
	$.check_shadow_css($$anchor, 'svelte-nuxm4g');

	var $$exports = { ...$.legacy_api() };
	var div = root();

	$.append($$anchor, div);

	return $.pop($$exports);
}