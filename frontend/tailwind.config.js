/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#eb1f27',
          50: '#fff5f5',
          100: '#ffeaea',
          200: '#ffd6d6',
          300: '#ffb3b3',
          400: '#ff8080',
          500: '#eb1f27', // Theme red
          600: '#c71a21',
          700: '#a3151b',
          800: '#7f1015',
          900: '#2c3e50', // Theme dark blue for hover
        },
        accent: '#eb1f27',
        link: '#eb1f27',
        'link-hover': '#2c3e50',
        heading: '#ffffff',
        body: '#34495e',
        border: '#e0e0e0',
        'site-bg': '#ffffff',
        'content-bg': '#ffffff',
        'button-bg': '#eb1f27',
        'button-text': '#ffffff',
        'button-hover-bg': '#2c3e50',
        'button-hover-text': '#ffffff',
        'footer-bg': '#2c3e50',
        'footer-text': '#ffffff',
        'footer-link': '#eb1f27',
        'footer-link-hover': '#ffffff',
        'footer-quote': '#ffffff',
        'footer-meta': '#e0e0e0',
        'footer-brand': '#eb1f27',
      },
    },
  },
  plugins: [],
}
