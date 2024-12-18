module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          primary: "#615EFC",
          second: "#7E8EF1",
          errorcolor: "#DF454A",
          bg: "#EEEEEE",
        },
        gray: {
          700: "#E9E9E9",
          400: "#C4C4C4",
          300: "#F0F0F0",
          alertgray: "#EFF0F2",
          border: "#B5B5B5",
          fee: "#555",
          login: "#B4B5B7",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};
