/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
      },
      colors: {
        primary: {
          DEFAULT: "#1a1a1a", // Negro principal
          light: "#2d2d2d",
          dark: "#0a0a0a",
        },
        accent: {
          DEFAULT: "#d4af37", // Dorado
          light: "#f0d98d",
          dark: "#b8941f",
        },
        secondary: {
          DEFAULT: "#6b7280", // Gris
          light: "#9ca3af",
          dark: "#4b5563",
        },
        dark: "#0a0a0a",
        light: "#f9fafb",
      },
    },
  },
  plugins: [],
};
