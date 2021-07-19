import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { box } from "../theme.js";

export const Stripe = styled.div`
  position: absolute;
  background-color: ${({ variant, theme }) => theme[variant]};
  border-radius: ${({ rounded }) => (rounded ? box.borderRadius : "none")};
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

Stripe.propTypes = {
  length: PropTypes.string,
  position: PropTypes.oneOf(["top", "left"]),
  rounded: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

Stripe.defaultProps = {
  length: "7rem",
  position: "top",
  rounder: false,
  variant: "secondary",
};
