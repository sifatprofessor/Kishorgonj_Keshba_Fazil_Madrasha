/** @type {import('tailwindcss').Config} */
const { withUt } = require("uploadthing/tw");
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withUt(
    withMT({
        content: [
            './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
            './src/components/**/*.{js,ts,jsx,tsx,mdx}',
            './src/app/**/*.{js,ts,jsx,tsx,mdx}',
            "./app/**/*.{js,ts,jsx,tsx,mdx}",
            "./pages/**/*.{js,ts,jsx,tsx,mdx}",
            "./components/**/*.{js,ts,jsx,tsx,mdx}",

            // Or if using `src` directory:
            "./src/**/*.{js,ts,jsx,tsx,mdx}",
        ],
        theme: {
            extend: {
                backgroundImage: {
                    'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                    'gradient-conic':
                        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                },
                fontFamily: {
                    'berkshire': ['Berkshire Swash', 'cursive'],
                    "nano": ["Noto Sans Bengali", "sans-serif"],
                    "arabic": ["Noto Sans Arabic", "sans-serif"],
                    "bangla": ["Galada", "cursive"]
                },
                animation: {
                    'slow-spin': 'slowSpin 10s linear infinite',
                },
                keyframes: {
                    slowSpin: {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                    },
                },
            },
        },
        plugins: [require("daisyui")],
        daisyui: {
            themes: ["light"],
        },
    })
);
