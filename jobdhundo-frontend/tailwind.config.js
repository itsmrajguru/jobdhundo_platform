
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This scans all your React files
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: '#19a974', // This makes 'bg-brandGreen' work
      },
    },
  },
  plugins: [],
}