/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soydeli: {
          page: "#FAFAFA",
          primary: "#6AAF48",
          dark: "#4B7A2F",
          label: "#4B7D1C",
          lime: "#8CC63F",
          mint: "#C3E9C3",
          surface: "#F5F7F2",
          border: "#EEF4E6",
          "border-hover": "#C3E9C3",
          // Legacy aliases
          light: "#E6F4EA",
          gold: "#6AAF48",
          "gold-dark": "#4B7A2F",
          "cream-green": "#E6F4EA",
        },
      },
      boxShadow: {
        soydeli: "0 8px 30px rgba(106, 175, 72, 0.08)",
        "soydeli-lg": "0 14px 40px rgba(106, 175, 72, 0.14)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
