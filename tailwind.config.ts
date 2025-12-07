import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // UAE-inspired color palette
        desert: {
          light: '#faf8f3',
          DEFAULT: '#d4b896',
          gold: '#c9a961',
          dark: '#a67c52',
        },
        winter: {
          light: '#e8f4f8',
          sky: '#b8d4e8',
          DEFAULT: '#4a6fa5',
          blue: '#2c5f6f',
          dark: '#1a3a4a',
        },
        crimson: {
          light: '#d14a5f',
          DEFAULT: '#8b2e3f',
          dark: '#5a1e29',
        },
        ivory: {
          DEFAULT: '#faf8f3',
          dark: '#f5f2ed',
        },
      },
      fontFamily: {
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
        amiri: ['var(--font-amiri)', 'serif'],
        sans: ['var(--font-tajawal)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-amiri)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(250, 204, 21, 0.5)',
        'glow-lg': '0 0 40px rgba(250, 204, 21, 0.6)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.2)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-slow': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-desert': 'linear-gradient(135deg, #faf8f3 0%, #d4b896 50%, #c9a961 100%)',
        'gradient-winter': 'linear-gradient(135deg, #e8f4f8 0%, #4a6fa5 50%, #2c5f6f 100%)',
        'gradient-shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}

export default config
