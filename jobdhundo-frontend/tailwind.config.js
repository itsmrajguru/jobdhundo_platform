/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f8fafc",
        surface: "#ffffff",
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          600: "#059669",
          700: "#047857",
        },
        text: {
          main: "#0f172a",
          muted: "#64748b",
        },
        border: "#e5e7eb",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.05)",
        card: "0 8px 24px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
