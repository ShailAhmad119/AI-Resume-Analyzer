/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  safelist: [
    "glassmorphism",
    "glow-border",
    "progress-container",
    "progress-bar",
    "fade-slide",
  ],

  theme: {
    extend: {
      animation: {
        progress: "progress 1s ease-out forwards",
      },
      keyframes: {
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
      },
    },
  },

  plugins: [],
};
