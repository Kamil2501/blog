import { theme } from './store';

const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
	.matches
	? 'dark'
	: 'light';

export function setDefaultTheme() {
	if (!localStorage.getItem('theme')) theme.set(prefersColorScheme);
	else theme.set(localStorage.getItem('theme'));
}
