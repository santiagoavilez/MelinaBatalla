/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	// These paths are just examples, customize them to match your project structure
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				blanco: '#F1F1F1',
				primary: 'B3906C',
				yema: '#E4A711',
				negro: '#2A2A2A',
				marmol: 'D1C1A1',
			}
		},
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
