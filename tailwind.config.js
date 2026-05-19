/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(249,115,22,0.2)" },
          "100%": { boxShadow: "0 0 40px rgba(249,115,22,0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        skillsphere: {
          primary: "#f97316",
          "primary-content": "#ffffff",
          secondary: "#ea580c",
          "secondary-content": "#ffffff",
          accent: "#fdba74",
          "accent-content": "#0f172a",
          neutral: "#1e293b",
          "neutral-content": "#cbd5e1",
          "base-100": "#030712",
          "base-200": "#0f172a",
          "base-300": "#1e293b",
          "base-content": "#f1f5f9",
          info: "#38bdf8",
          "info-content": "#0c1a2e",
          success: "#34d399",
          "success-content": "#012b1c",
          warning: "#fbbf24",
          "warning-content": "#1a0e00",
          error: "#f87171",
          "error-content": "#2c0000",
        },
      },
    ],
    darkTheme: "skillsphere",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
  },
};
