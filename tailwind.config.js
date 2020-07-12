module.exports = {
  purge: [],
  theme: {
    extend: {
      margin: {
        xl: "25%",
        xxl: "50%",
        md: "20%",
        mdd: "34%",
        sm: "15%",
      },
      width: {
        "45": "45%",
        "60": "60%",
      },
      height: {
        sm: "500px",
        smm: "450px",
        "30": "30%",
      },
      colors: {
        "nav-green": "#13631e",
      },
    },
    filter: {
      // defaults to {}
      none: "none",
      grayscale: "grayscale(1)",
      invert: "invert(1)",
      sepia: "sepia(1)",
      blur: "blur(6px)",
      "backdrop-filter": "blur(0.8)",
    },
    backdropFilter: {
      // defaults to {}
      none: "none",
      blur: "blur(20px)",
    },
  },
  variants: {
    filter: ["responsive"], // defaults to ['responsive']
    backdropFilter: ["responsive"], // defaults to ['responsive']
  },
  plugins: [require("tailwindcss-filters")],
};
