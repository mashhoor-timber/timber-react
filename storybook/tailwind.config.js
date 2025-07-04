import { heroui } from "@heroui/theme/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../src/**/*.{js,jsx,ts,tsx}",
    "../node_modules/@heroui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [heroui()],
};
