export const colors = {
  // main colors
  primary: "#ff7067",
  secondary: "#7598d6",

  // global colors
  white: "#fff",
  bgPrimary: "#fff",
  bgSecondary: "#f2f5fa",
  bgTertiary: "#e4e8ef",
  border: "#bbcadf",

  // text colors
  title: "#2f3b6c",
  paragraph: "#3e486e",
  altText: "#4d73b8",
  placeholder: "#9298af",

  // form colors
  error: "#eb5757",
  validate: "#7bd0ac"
};

colors.primaryText = colors.white;
colors.secondaryText = colors.white;

/* Rem with a 10px base */

export const spacings = {
  tiny: "0.4rem",
  xsmall: "0.8rem",
  small: "1rem",
  base: "1.6rem",
  medium: "2rem",
  xmedium: "2.4rem",
  large: "3.2rem",
  larger: "4rem"
};

export const fonts = {
  lineHeight: "1.625",
  lineHeightTitle: "1.25",
  sizes: {
    tiny: "1.2rem",
    small: "1.4rem",
    default: "1.6rem",
    headings: {
      small: "1.8rem",
      medium: "2.8rem",
      large: "3.2rem"
    },
    medium: "2rem"
  }
};

export const breakpoints = {
  desktop: "1200px",
  tablet: "980px",
  mobile: "600px"
};

const shadowColor = "85, 112, 160";
const largeShadow = "0px 10px 50px";
const smallShadow = "0px 10px 15px";

export const box = {
  border: `1px solid ${colors.border}`,
  borderRadius: "0.6rem",
  shadow: {
    default: `${largeShadow} rgba(${shadowColor}, 0.12), ${smallShadow} rgba(${shadowColor}, 0.1)`,
    large: `${largeShadow} rgba(${shadowColor}, 0.2), ${smallShadow} rgba(${shadowColor}, 0.25)`
  }
};

export const animations = {
  transitionTiming: "250ms"
};
