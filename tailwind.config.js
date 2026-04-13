/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                breathe: {
                    '0%, 100%': { transform: 'scale(0.8)', opacity: '0.8' },
                    '50%': { transform: 'scale(1.3)', opacity: '1' },
                }
            },
            animation: {
                breathe: 'breathe 2s ease-in-out infinite',
            }
        },
    },
    plugins: [],
}