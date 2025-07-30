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
  plugins: [heroui({
    prefix: 'timber',
    layout: {
      radius: {
        // small: '0px',
        // medium: '28px',
        // large: '28px',
      },
    },
    themes: {
      light: {
        colors: {
          background: '#ffffff',
          foreground: '#101010',
          light: '#FFFFFF',
          white: '#FFFFFF',
          divider: '#E8E8E8',
          primary: {
            DEFAULT: '#5350F9',
            foreground: '#101010',
          },
          secondary: {
            DEFAULT: '#262467',
          },
          success: {
            DEFAULT: '#20C230',
            100: '#ECFEED',
          },
          danger: {
            DEFAULT: '#F90000',
            100: '#FEECED',
          },
          warning: {
            DEFAULT: '#FF7A1A',
            100: '#FFE7D5',
            600: '#FF7A1A',
          },
          greyed: {
            DEFAULT: '#757575',
            100: '#ECECEC',
          },
          info: '#0294FF',
          'timber-blue': '#5350F9',
          violet: '#5350F9',
          pink: '#E84187',
          focus: '#0094ff',
          content2: '#444444',
        },
      },
      dark: {
        colors: {
          background: '#3f3f46',
          foreground: '#f8f8f8',
          light: '#000000',
          white: '#000000',
          divider: '#5d5d5d',
          primary: {
            DEFAULT: '#0094ff',
            foreground: '#101010',
          },
          secondary: {
            DEFAULT: '#0094ff',
          },
          danger: '#C22020',
          focus: '#0094ff',
        },
      },
    },
  })],
};
