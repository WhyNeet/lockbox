/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: '"Inter Variable", sans-serif',
      },
      colors: {
        "neutral-850": "rgba(28, 28, 28, var(--tw-bg-opacity, 1))",
        "neutral-750": "rgba(46, 46, 46, var(--tw-bg-opacity, 1))",
        "blue-500": "#007AFF",
      },
      height: {
        4.5: "18px",
      },
      keyframes: {
        "star-bounce": {
          "0%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(100px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "appear-widen": {
          "0%": { width: "0px", opacity: 0 },
          "100%": { width: "fit", opacity: 1 },
        },
      },
      animation: {
        "star-bounce": "star-bounce infinite 2200ms ease-in-out",
        "appear-widen": "appear-widen 600ms ease-in-out",
      },
    },
  },
  plugins: [],
};
