import { css } from "../../../styled-system/css";

export const CardTitleStyle = css({
  "& > a": {
    _after: {
      top: "calc(50% - 16px)",
    },
  },
});

export const ButtonStyle = css({
  maxH: "40px!",
  width: "100%!",
  md: {
    w: "auto!",
  },
});
