/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D2D2D',
          light: '#3F3F3F',
          dark: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#A45C1A',
          dark: '#8B4513',
          light: '#B8732C',
        },
        eggshell: '#F4F1EA', // Warm cream background
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Responsive typography with mobile-first approach
        'hero': ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }], // 40px mobile
        'h1': ['2rem', { lineHeight: '1.2', fontWeight: '700' }], // 32px mobile
        'h2': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }], // 28px mobile
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }], // 24px mobile
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], // 20px mobile
        'body-large': ['1.125rem', { lineHeight: '1.6' }], // 18px
        'body': ['1rem', { lineHeight: '1.6' }], // 16px
        'small': ['0.875rem', { lineHeight: '1.5' }], // 14px
        'badge': ['1rem', { lineHeight: '1.3', fontWeight: '500' }], // 16px
      },
      // Desktop font sizes (applied via md: breakpoint)
      screens: {
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      maxWidth: {
        'container': '1280px',
        'container-wide': '1400px',
      },
    },
  },
  plugins: [],
}

