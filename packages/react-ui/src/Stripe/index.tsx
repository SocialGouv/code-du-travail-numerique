import styled, { css } from "styled-components";

import { box } from "../theme";

interface StripeProps {
  rounded?: boolean;
  variant?: "primary" | "secondary";
  position?: "top" | "left";
  length?: string;
}

export const Stripe = styled.span<StripeProps>`
  position: absolute;
  background-color: ${({ variant, theme }) => theme[variant ?? "secondary"]};
  border-radius: ${({ rounded }) => (rounded ? box.borderRadius : "0")};
  ${({ position = "top", length }) => {
    return css`
      top: ${position === "top" ? "0" : "50%"};
      left: ${position === "left" ? "0" : "50%"};
      width: ${position === "top" ? length : "0.4rem"};
      height: ${position === "left" ? length : "0.4rem"};
      transform: ${`translate${position === "top" ? "X" : "Y"}(-50%)`};
    `;
  }}
`;
