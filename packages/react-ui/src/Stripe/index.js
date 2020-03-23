import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { box } from "../theme";

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
  position: PropTypes.oneOf(["top", "left"]),
  variant: PropTypes.oneOf(["primary", "secondary"]),
  rounded: PropTypes.bool,
  length: PropTypes.string,
};

Stripe.defaultProps = {
  position: "top",
  rounder: false,
  variant: "secondary",
  length: "7rem",
};
