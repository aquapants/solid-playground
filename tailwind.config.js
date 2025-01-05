/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{css,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      height: {
        nav: "42px", // custom nav-height, use:`className="h-nav"` in navBar component // ! must match --navbar-height in index.css
      },
      screens: {
        'widescreen': {'raw': '(min-aspect-ratio: 1/1)'}, // Widescreen monitors
        'tallscreen': {'raw': '(max-aspect-ratio: 3/4)'}, // Narrow screens (phones)
      },
    },
  },
  plugins: [],
}

