/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Baloo Tammudu 2'", "system-ui", "sans-serif"],
        body: ["'Noto Sans Telugu'", "system-ui", "sans-serif"],
        script: ["Ramaraja", "cursive"],
      },
      colors: {
        laddu: {
          gold: "#FFB100",
          maroon: "#7B003C",
          pink: "#FF3CAC",
          purple: "#784BA0",
          indigo: "#2B86C5",
        },
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        popIn: {
          "0%": { transform: "scale(0.7)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        blob: "blob 9s infinite ease-in-out",
        shimmer: "shimmer 6s ease infinite",
        wiggle: "wiggle 0.35s ease-in-out 2",
        popIn: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)",
      },
    },
  },
  plugins: [],
}
