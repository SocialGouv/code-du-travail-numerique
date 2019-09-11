export const animation = {
  timings: {
    transition: "250ms"
  }
};

export const box = {
  borderRadius: {
    rounded: "50%"
  },
  shadow: "2px 3px 9px"
};

export const breakpoints = ["600", "1280"];
breakpoints.tablet = `min-width: ${breakpoints[0]}px`;
breakpoints.desktop = `min-width: ${breakpoints[1]}px`;

export const font = {
  weights: {
    default: "400",
    bold: "700"
  },
  lineHeights: {
    default: 1.5,
    headings: 1.25
  },
  sizes: [0.75, 0.874, 1, 1.125, 2]
};
font.sizes.default = `${font.sizes[1]}rem`;
font.sizes.Heading1 = `${font.sizes[4]}rem`;
font.sizes.Heading2 = `${font.sizes[3]}rem`;
font.sizes.Heading3 = `${font.sizes[2]}rem`;
font.sizes.link = `${font.sizes[0]}rem`;
font.sizes.small = `${font.sizes[0]}rem`;

/* Rem with a 16px base:
  20px = 1.25rem => (20 * 1) / 16
  12px => 0.75rem
  10px => 0.625rem
  etc.
*/
export const space = [0, 0.25, 0.5, 0.625, 1, 1.25, 2, 2.5];
space.tiny = `${space[1]}rem`; // 4px;
space.smaller = `${space[2]}rem`; // 8px;
space.small = `${space[3]}rem`; // 10px;
space.default = `${space[4]}rem`; // 16px;
space.gutter = `${space[5]}rem`; // 20px;
space.large = `${space[6]}rem`; // 32px;
space.larger = `${space[7]}rem`; // 40px;

export const variants = ["primary", "secondary", "info", "danger"];

const colors = {
  black: "#2c2c2e",
  grey: {
    dark: "#9299A2",
    light: "#c9d3df"
  },
  white: "#ffffff",

  text: {
    dark: "#003b80",
    alt: "#0366d4",
    light: "#ffffff"
  }
};

colors.primary = {
  default: "#0366D4",
  light: "#ecf4fc",
  textOnLight: colors.text.dark,
  textOnDefault: colors.text.light
};
colors.secondary = {
  default: "#6ec5cc",
  light: "#e9f6f7",
  textOnLight: colors.text.dark,
  textOnDefault: colors.text.light
};
colors.info = {
  default: "#ffda17",
  light: "#fff6d9",
  textOnLight: colors.text.dark,
  textOnDefault: colors.text.dark
};
colors.danger = {
  default: "#d7777b",
  light: "#f6d5cd",
  textOnLight: colors.text.dark,
  textOnDefault: colors.text.light
};

const gradients = {
  primary: "linear-gradient(90deg, #0F6FDA, #3696FF)"
};

export const theme = {
  colors,
  gradients
};
