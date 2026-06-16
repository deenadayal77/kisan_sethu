import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16A34A',
          light: '#DCFCE7',
        },
        accent: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
        },
        background: '#FAFAFA',
        surface: '#FFFFFF',
        'text-primary': '#0F172A',
        'text-secondary': '#64748B',
        border: '#E2E8F0',
        error: '#DC2626',
        success: '#16A34A',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      borderRadius: {
        card: '16px',
        button: '12px',
        input: '10px',
      },
      boxShadow: {
        'card-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        sidebar: '260px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
