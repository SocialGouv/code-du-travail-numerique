import { style } from "@vanilla-extract/css";

export const list = style({
  position: "absolute",
  top: "2.5rem",
  width: "100%",
  zIndex: 100,
  background: "var(--background-default-grey)",
});

export const suggestion = style({
  cursor: "pointer",
  lineHeight: "2rem",
  listStyleType: "none",
  textAlign: "left",
  background: "var(--background-default-grey)",
  selectors: {
    "&:nth-child(2n + 1)": {
      background: "var(--background-default-grey-hover)",
    },
  },
});

export const isHighlighted = style({
  background: "var(--background-default-grey-active)",
  selectors: {
    "&:nth-child(2n + 1)": {
      background: "var(--background-default-grey-active)",
    },
  },
});
