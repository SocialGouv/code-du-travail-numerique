import { css } from "@styled-system/css";

export const defaultInputStyle = css({
  width: "fit-content!",
  minWidth: `282px!`,
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "&[type=number]": {
    appearance: "textfield",
  },
});
