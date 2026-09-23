/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        white: {
          50: "#FFFFFF",
          75: "#F7F7F7",
          100: "#E7E7E7",
          150: "#D1D1D1",
          200: "#9E9FA7",
          400: "#D0D0D0",
        },
        main: {
          50: "#F0F8FF",
          100: "#E1F1FD",
          200: "#BCE2FB",
          300: "#81CDF8",
          600: "#2DB5FF",
          500: "#22A4EB",
        },
        secondary: {
          100: "#FFF3C5",
          500: "#F29200",
        },
        black: {
          600: "#888888",
          700: "#4F4F4F",
          900: "#191919",
        },
        status: {
          success: "#56AD7E",
          error: "#FF5858",
          alert: "#FECA57",
          info: "#54A0FF",
          warning: "#FF9F43",
        },
        neutral: {
          100: "#F4F4F4",
          300: "#E0E0E0",
          400: "#BDBDBD",
        },
        text: {
          disabled: "#D0D0D0",
        },
      },
    },
  },
  plugins: [],
};
