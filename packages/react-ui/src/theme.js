/* eslint-disable sort-keys-fix/sort-keys-fix */
import { darken, getContrast, lighten, rgba } from "polished";

const WCAG_AA_MINIMAL_CONTRAST = 3;
const BORDER_BLACK_CONTRAST = 12.62;

const maximiseContrast = (color) => {
  const whiteContrast = getContrast(color, "#fff");
  const blackContrast = getContrast(color, "#000");
  if (
    whiteContrast >= WCAG_AA_MINIMAL_CONTRAST ||
    blackContrast <= BORDER_BLACK_CONTRAST
  ) {
    return darken(1, color);
  } else {
    return lighten(1, color);
  }
};

export const colors = {
  // main colors
  primary: "#f66663", //geniune color -> #ff7067
  secondary: "#7994d4", //geniune color -> #7598d6

  heroGradientStart: "#d1dffd",

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
  validate: "#7bd0ac",
};

colors.primaryText = colors.white;
colors.secondaryText = colors.white;

export const blackAndWhiteColors = Object.entries(colors).reduce(
  (blackAndWhiteColors, [colorName, colorValue]) => {
    blackAndWhiteColors[colorName] = maximiseContrast(colorValue);
    return blackAndWhiteColors;
  },
  { noColors: true }
);

/* Rem with a 10px base */

export const spacings = {
  tiny: "0.4rem",
  xsmall: "0.8rem",
  small: "1rem",
  base: "1.6rem",
  medium: "2rem",
  xmedium: "2.4rem",
  large: "3.2rem",
  larger: "4rem",
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
      xmedium: "2.2rem",
      mobileMedium: "2.6rem",
      medium: "2.8rem",
      large: "3.2rem",
    },
    medium: "2rem",
  },
};

export const breakpoints = {
  desktop: "1180px",
  tablet: "980px",
  mobile: "600px",
  intDesktop: 1180,
  intTablet: 980,
  intMobile: 600,
};

const shadow = "0 1rem 2rem";

export const box = {
  border(color) {
    return `1px solid ${color}`;
  },
  borderRadius: "0.6rem",
  shadow: {
    default(color) {
      return `${shadow} ${rgba(color, 0.2)}`;
    },
    large(color) {
      return `${shadow} ${rgba(color, 0.4)}`;
    },
  },
};

export const animations = {
  transitionTiming: "250ms",
};
