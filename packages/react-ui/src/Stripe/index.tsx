import styled, { css } from "styled-components";

import { box } from "../theme.js";

type StripeProps = {
  rounded: boolean;
  variant: "primary" | "secondary";
  position: "top" | "left";
  length: string;
};

export const Stripe = styled.span<StripeProps>`
  position: absolute;
  background-color: ${({ variant, theme }) => theme[variant ?? "primary"]};
  border-radius: ${({ rounded }) => (rounded ? box.borderRadius : "0")};
  ${({ position, length }) => {
    return css`
      top: ${position === "top" ? "0" : "50%"};
      left: ${position === "left" ? "0" : "50%"};
      width: ${position === "top" ? length : "0.4rem"};
      height: ${position === "left" ? length : "0.4rem"};
      transform: ${`translate${position === "top" ? "X" : "Y"}(-50%)`};
    `;
  }}
`;

Stripe.defaultProps = {
  length: "7rem",
  position: "top",
  rounded: false,
  variant: "secondary",
};
