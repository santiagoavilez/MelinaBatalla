/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: {
    relative: true,
    transform: (content) => content.replace(/taos:/g, ''),
    files: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        "xs": "340px",
        "xxl": "1280px",
      },
      colors: {
        blanco: '#FAF7F7',
        primary: '#B3906C',
        yema: '#E28443',
        negro: '#09090B',
        marmol: '#EDE9DE',
        marron: '#E09E71',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#E1A543",
          foreground: "#09090B",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },

  },
  safelist: [
    '!duration-[0ms]',
    '!delay-0ms',
    'html.js :where([class*="taos:"]:not(.taos-init))'
  ],
  plugins: [
    require('taos/plugin'),
    require("tailwindcss-animate"),
  ],


}

// mode: 'jit',
//   // These paths are just examples, customize them to match your project structure
//   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
//     theme: {
//   extend: {
//     colors: {
//       blanco: '#F1F1F1',
//         primary: 'B3906C',
//           yema: '#E4A711',
//             negro: '#2A2A2A',
//               marmol: 'D1C1A1',
// 			}
//   },
// },
// plugins: [
//   function ({ addBase, theme }) {
//     function extractColorVars(colorObj, colorGroup = '') {
//       return Object.keys(colorObj).reduce((vars, colorKey) => {
//         const value = colorObj[colorKey];
//         const newVars =
//           typeof value === 'string'
//             ? { [`--color\${colorGroup}-\${colorKey}`]: value }
//             : extractColorVars(value, `-\${colorKey}`);
//         return { ...vars, ...newVars };
//       }, {});
//     }
//     addBase({
//       ':root': extractColorVars(theme('colors')),
//     });
//   },
// ],
