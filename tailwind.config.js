/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/app/**/*.{js,jsx}',
        './src/components/**/*.{js,jsx}'
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    400: '#fb923c',
                    500: '#f97316',
                    600: '#ea580c',
                    700: '#c2410c'
                },
                ink: {
                    900: '#0f172a',
                    800: '#1e293b'
                }
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif']
            }
        }
    },
    plugins: []
};
