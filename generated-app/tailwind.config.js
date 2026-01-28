/** @type {import('tailwindcss').Config} */
const { nextui } = require("@heroui/react"); // If this fails, try: require("@nextui-org/react")

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // ⚠️ CRITICAL: This line makes sure HeroUI styles work
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", 
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [], // If you installed HeroUI, add: [nextui()]
}