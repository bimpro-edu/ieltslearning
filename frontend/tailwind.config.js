/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#eb1f27',
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
        'footer-bg': '#eb1f27',
        'footer-text': '#ffffff',
        'footer-link': '#ffffff',
        'footer-link-hover': '#2c3e50',
        'footer-quote': '#ffffff',
        'footer-meta': '#e0e0e0',
        'footer-brand': '#ffffff',
      },
    },
  },
  plugins: [],
};
