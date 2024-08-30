import { style } from "@vanilla-extract/css";

export const mainContainer = style({
  background: "var(--background-alt-blue-france)",
});

export const title = style({
  color: "var(--text-action-high-blue-france)",
  fontWeight: 700,
  textAlign: "center",
});

export const paragraph = style({
  color: "var(--text-action-high-blue-france)",
});

export const buttonContainer = style({
  display: "flex",
  justifyContent: "center",
});
