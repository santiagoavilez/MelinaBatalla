/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	// These paths are just examples, customize them to match your project structure
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
		function ({ addBase, theme }) {
			function extractColorVars(colorObj, colorGroup = '') {
				return Object.keys(colorObj).reduce((vars, colorKey) => {
					const value = colorObj[colorKey];
					const newVars =
						typeof value === 'string'
							? { [`--color\${colorGroup}-\${colorKey}`]: value }
							: extractColorVars(value, `-\${colorKey}`);
					return { ...vars, ...newVars };
				}, {});
			}
			addBase({
				':root': extractColorVars(theme('colors')),
			});
		},
	],
}
