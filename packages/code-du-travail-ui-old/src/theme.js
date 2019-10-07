export const variants = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "danger"
];

export const colors = {
  blueLight: "#006be6",
  blueDark: "#005994",

  white: "#fff",

  lightBackground: "#f9f9fc",
  darkBackground: "#ebeff3",

  lightGrey: "#c9d3df",
  grey: "#adb9c9",
  darkGrey: "#8393a7",
  darkerGrey: "#53657d",

  lightText: "#4c5467",
  darkText: "#434956",

  black: "#0c0c0e",

  markBackground: "#fff28e",
  successBackground: "#e0f2bd",
  infoBackground: "#e5f1fe",
  warningBackground: "#fee5ad",
  dangerBackground: "#f6bcc2",
  focus: "#80bdff"
};

// adding colour shortcuts
colors.primaryBackground = colors.blueDark;
colors.secondaryBackground = colors.darkBackground;
colors.focusShadow = colors.infoBackground;
colors.primaryText = colors.white;
colors.secondaryText = colors.black;
colors.successText = colors.black;
colors.infoText = colors.black;
colors.warningText = colors.black;
colors.dangerText = colors.black;

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
  larger: "2.5rem", // 40px
  interComponent: "1.25rem"
};

export const fonts = {
  sizeBase: "1rem", // should be 16px
  lineHeight: "1.4",
  sizeXsmall: "0.75rem", // 12px
  sizeSmall: "0.875rem", // 14px
  sizeH1: "2.25rem",
  sizeH2: "1.875rem",
  sizeH3: "1.625rem",
  sizeH4: "1.375rem",
  sizeH5: "1.125rem",
  sizeH6: "1rem"
};

export const breakpoints = {
  desktop: "1200px",
  tablet: "980px",
  mobile: "600px"
};

export const box = {
  lightBorderRadius: "0.2rem",
  border: `1px solid ${colors.lightGrey}`,
  borderRadius: "0.25rem",
  shadow: `0 5px 10px 0 ${colors.darkBackground}`
};

export const animations = {
  transitionTiming: "250ms"
};
