/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        moss: {
          50: '#f3f7f1',
          100: '#e3ede0',
          200: '#c8dbbf',
          300: '#a3c197',
          400: '#7ba169',
          500: '#5d8548',
          600: '#476a37',
          700: '#39532e',
          800: '#2f4327',
          900: '#283821',
          950: '#131e0f',
        },
        soil: {
          50: '#faf7f2',
          100: '#f1ebdf',
          200: '#e3d6bf',
          300: '#cfb893',
          400: '#bb9a6c',
          500: '#a98253',
          600: '#96704a',
          700: '#7c5b3f',
          800: '#664c38',
          900: '#544030',
          950: '#2d2018',
        },
        glass: {
          50: '#f0f7f6',
          100: '#daece8',
          200: '#b8dad3',
          300: '#88bfb6',
          400: '#5b9f97',
          500: '#44847d',
          600: '#376a65',
          700: '#305653',
          800: '#2b4644',
          900: '#263b3a',
          950: '#132322',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
          },
        },
      },
    },
  },
  plugins: [],
};