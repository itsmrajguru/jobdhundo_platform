/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Slate / Navy Theme
        bg: "#0f172a",
        surface: "#1e293b",

        // Electric Purple Brand Color
        primary: {
          50: "#f3e8ff",
          100: "#e9d5ff",
          200: "#d8b4fe",
          300: "#c084fc",
          400: "#a855f7",
          500: "#a855f7", // Main Accent
          600: "#9333ea",
          700: "#7e22ce",
        },

        // Text Colors
        text: {
          main: "#f8fafc", // White/Slate-50
          muted: "#94a3b8", // Slate-400
        },

        // Border Colors
        border: "rgba(255, 255, 255, 0.1)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        card: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        glow: "0 0 20px rgba(168, 85, 247, 0.2)", // Purple Glow
      },
    },
  },
  plugins: [],
};
