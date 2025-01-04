/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{css,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      height: {
        nav: "42px", // custom nav-height, use:`className="h-nav"` // ! must match --navbar-height in global.css
      },
      screens: {
        'widescreen': {'raw': '(min-aspect-ratio: 1/1)'}, // Widescreen monitors
        'tallscreen': {'raw': '(max-aspect-ratio: 3/4)'}, // Narrow screens
      },
    },
  },
  plugins: [],
}

