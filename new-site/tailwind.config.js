/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a202c', // Sophisticated charcoal
        secondary: '#b45309', // Premium bronze
        accent: '#92400e', // Warm bronze accent
        'brand-800': '#0f172a',
        'brand-200': '#d6bcb0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.875rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-large': ['1.25rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}

