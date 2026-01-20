/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Magenta EMMIO (mappa 'rosa' alle tinte magenta)
        rosa: {
          50: '#fde6f4',
          100: '#facce8',
          200: '#f5a5d4',
          300: '#ef74bd',
          400: '#e93aa5',
          500: '#d4008f',
          600: '#b00076',
          700: '#8c005d',
          800: '#670046',
          900: '#4a0033',
        },
        // Blu istituzionale SDA Bocconi (mappa 'kenya' alle tinte blu)
        kenya: {
          50: '#eaf2f9',
          100: '#d4e4f3',
          200: '#9db7d3',
          300: '#6f93b6',
          400: '#3f6f99',
          500: '#003c71',
          600: '#003462',
          700: '#002b53',
          800: '#002445',
          900: '#001a32',
        }
      }
    },
  },
  plugins: [],
}
