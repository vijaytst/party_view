module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
      primary: "#fff",
      secondary: "#ffed4a",
      danger: "#e3342f",
    }),
    extend: {
      fontFamily: {
        yanone: ["Yanone Kaffeesatz", "sans-serif"],
      },
      backgroundColor: {
        primary: "#66fcf1",
        "primary-theme": "#030816d8",
        new: "#45a29e",
      },
      borderColor: {
        primary: "#66fcf1",
        new: "#45a29e",
      },
      colors: {
        primary: "#66fcf1",
        secondary: "#ff3",
        danger: "#ff5",
        darker:"#000000",
        gray: {
          darkest: "#0b0c10",
          dark: "#3c4858",
          DEFAULT: "#c0ccda",
          light: "#e0e6ed",
          lightest: "#f9fafc",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
