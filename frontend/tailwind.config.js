/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'mulled-wine': '#4D455D',
                'alto': '#D9D9D9',
                'lighter': 'rgba(255, 255, 255, 0.4)',
                'transparent-green': 'rgba(108, 163, 160, 0.4)',
                'transparent-red': 'rgba(233, 100, 121, 0.4)',
                'emerald-green':'#50C878',
                'royal-blue':'#0015FF',
                'dark-blue' : '#0d1675',
            }
        },
    },
    plugins: [require("daisyui")],
};
