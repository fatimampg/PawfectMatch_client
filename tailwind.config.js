/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      customFont: ['"Inter"', "sans-serif"],
    },
    colors: {
      lightest: "#F4F9F4",
      light: "#A7D7C5",
      medium: "#90C3AF",
      darkest: "#7DA4A1",
      white: "#ffffff",
      darkGrey: "#475569",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};

// FIGMA FILE:
// lightest: "#F4F9F4",
// light: "#A7D7C5",
// medium: "#74B49B", --> requires opacity-80 (used equivalent color without transparency)
// darkest: "#5C8D89", --> requires opacity-80 (used equivalent color without transparency)
// white: "#ffffff", 5C8D89
