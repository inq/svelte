import { effect } from '../reactivity/effects.js';
import * as w from '../warnings.js';

/** @type {Map<String, Set<HTMLStyleElement>>} */
var all_styles = new Map();

/**
 * @param {String} hash
 * @param {HTMLStyleElement} style
 */
export function register_style(hash, style) {
	var styles = all_styles.get(hash);

	if (!styles) {
		styles = new Set();
		all_styles.set(hash, styles);
	}

	styles.add(style);
}

/**
 * @param {String} hash
 */
export function cleanup_styles(hash) {
	var styles = all_styles.get(hash);
	if (!styles) return;

	for (const style of styles) {
		style.remove();
	}

	all_styles.delete(hash);
}

/** @type {WeakMap<ShadowRoot, Set<string>>} */
var warned_shadow_roots = new WeakMap();

/**
 * @param {ShadowRoot} root
 * @param {string} selector
 */
function shadow_root_has_rule(root, selector) {
	for (var sheet of root.adoptedStyleSheets) {
		for (var rule of sheet.cssRules) {
			if (rule.cssText.includes(selector)) return true;
		}
	}
	for (var style of root.querySelectorAll('style')) {
		if (style.textContent?.includes(selector)) return true;
	}
	return false;
}

/**
 * @param {Node} anchor
 * @param {string} hash
 */
export function check_shadow_css(anchor, hash) {
	effect(() => {
		var root = anchor.getRootNode();
		if (!(root instanceof ShadowRoot)) return;
		if (shadow_root_has_rule(root, '.' + hash)) return;

		var warned = warned_shadow_roots.get(root);
		if (!warned) warned_shadow_roots.set(root, (warned = new Set()));
		if (warned.has(hash)) return;
		warned.add(hash);

		w.shadow_css_missing(hash);
	});
}
