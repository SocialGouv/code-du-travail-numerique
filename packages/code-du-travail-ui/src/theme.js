const baseColors = {
  black: "#0c0c0e",
  almostBlack: "#26353f",
  blue: "#0053b3",
  blueLight: "#006be6",
  blueDark: "#003b80",

  elementBackground: "#f5f7fa",
  elementBorder: "#c9d3df",
  white: "#fff",

  lighterGrey: "#ebeff3",
  lightGrey: "#c9d3df",
  grey: "#adb9c9",
  darkGrey: "#8393a7",
  darkerGrey: "#53657d",

  title: "#006ab2",

  lightBackground: "#f9f9fc",
  lightText: "#4c5467",

  darkBackground: "#ebeff3",
  darkText: "#434956"
};

const feedbackColors = {
  primaryBackground: "#005994",
  primaryText: baseColors.white,
  secondaryBackground: "#eaeaea",
  secondaryText: baseColors.black,
  successBackground: "#e0f2bd",
  successText: baseColors.black,
  infoBackground: "#d7e8f9",
  infoText: baseColors.black,
  warningBackground: "#fee5ad",
  warningText: baseColors.black,
  dangerBackground: "#f6bcc2",
  dangerText: baseColors.black,

  markBackground: "#fff28e",

  focus: "#80bdff",
  focusShadow: "#bfdeff"
};

export const colors = { ...baseColors, ...feedbackColors };

/* Rem with a 16px base:
  20px = 1.25rem => (20 * 1) / 16
  12px => 0.75rem
  10px => 0.625rem
  etc.
*/
export const spacing = {
  tiny: "0.25rem", // 4px
  xsmall: "0.5rem", // 8px
  small: "0.625rem", // 10px
  base: "1rem", // 16px
  medium: "1.25rem", // 20px
  large: "2rem", // 32px
  larger: "2.5em", // 40px
  interComponent: "1.25rem"
};

export const fonts = {
  sizeBase: "1rem",
  lineHeight: "1.4",
  sizeXsmall: "0.8rem",
  sizeSmall: "0.9rem",
  sizeH1: "1.6rem",
  sizeH2: "1.5rem",
  sizeH3: "1.4rem",
  sizeH4: "1.3rem",
  sizeH5: "1.2rem",
  sizeH6: "1.1rem"
};

export const breakpoints = {
  desktop: "1200px",
  tablet: "980px",
  mobile: "600px"
};

export const box = {
  lightBorderRadius: "0.2rem",
  borderRadius: "0.25rem",
  shadow: `0 5px 10px 0 ${baseColors.lightGrey})`,
  shadowBottom: "0 10px 10px -10px #b7bcdf"
};
