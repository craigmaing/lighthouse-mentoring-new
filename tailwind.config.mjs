/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // PREMIUM INFLUENCER COLOR SYSTEM - Based on top 20 site analysis
        // Primary Palette - Trust & Innovation
        'primary': '#1E3A8A',     // Deep blue - trust/professionalism (like Dave Ramsey)
        'accent': '#10B981',      // Bright teal - innovation/growth (unique differentiator)
        'warning': '#F59E0B',     // Amber - attention/highlight
        'dark': '#1F2937',        // Charcoal - readable text

        // Supporting Colors - Minimal
        'gray': {
          900: '#1A202C',    // Dark text
          700: '#4A5568',    // Body text
          100: '#F7FAFC',    // Light backgrounds
        },

        // Legacy mapping for compatibility
        'brand': {
          50: '#E6F4F9',
          100: '#CCE9F3',
          200: '#99D3E7',
          300: '#66BCDB',
          400: '#4DB3D5',
          500: '#0A4F63',  // Updated to new primary
          600: '#0A4F63',  // Primary
          700: '#0A4F63',  // Primary
          800: '#0A1628',  // Dark
          900: '#0A1628',  // Dark
        },
        'neutral': {
          50: '#F7FAFC',   // gray-100
          100: '#F7FAFC',  // gray-100
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4A5568',  // gray-700
          700: '#4A5568',  // gray-700
          800: '#1A202C',  // gray-900
          900: '#1A202C',  // gray-900
        },

        // Simplified aliases
        background: '#FFFFFF',
        surface: '#F7FAFC',
        border: '#E5E7EB',
        'text-primary': '#1A202C',
        'text-secondary': '#4A5568',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'], // Could upgrade to Montserrat later
      },
      fontSize: {
        // Typography Scale - Larger for Impact
        'xs': '14px',
        'sm': '16px',
        'base': '18px',     // Up from 16px default
        'lg': '20px',       // Lead paragraphs
        'xl': '24px',
        '2xl': '28px',      // H3 size
        '3xl': '36px',
        '4xl': '42px',      // H2 size
        '5xl': '56px',      // H1 size
        '6xl': '72px',      // Hero statements
      },
      fontWeight: {
        'light': '300',     // For large display text only
        'normal': '400',    // Body text
        'medium': '500',    // Emphasized body
        'semibold': '600',  // Subheadings
        'bold': '700',      // Main headings
      },
      lineHeight: {
        'tight': '1.2',     // Headings
        'snug': '1.4',
        'normal': '1.6',
        'relaxed': '1.7',   // Body text - improved readability
        'loose': '2',
      },
    },
  },
  plugins: [],
}