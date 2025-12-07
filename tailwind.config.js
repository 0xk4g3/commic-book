/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                desert: {
                    gold: '#c9a961',
                    light: '#d4b896',
                },
                winter: {
                    blue: '#2c5f6f',
                    sky: '#4a6fa5',
                },
                uae: {
                    crimson: '#8b2e3f',
                    ivory: '#faf8f3',
                }
            },
            fontFamily: {
                'tajawal': ['Tajawal', 'sans-serif'],
                'amiri': ['Amiri', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in',
                'slide-up': 'slideUp 0.5s ease-out',
                'panel-reveal': 'panelReveal 0.6s ease-out',
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
                panelReveal: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
