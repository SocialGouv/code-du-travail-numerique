import React from "react";
import styled, { css } from "styled-components";

import { Stripe } from "../../Stripe";
import { breakpoints, fonts, spacings } from "../../theme.js";

type Props = {
  children: React.ReactNode;
  stripe?: "left" | "none";
  variant?: "primary" | "secondary";
  isFirst?: boolean;
  shift?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
  role?: string;
  ariaLevel?: number | string;
};

export const Heading = (props: Props) => (
  <StyledHeading
    as={props.as}
    stripe={props.stripe}
    shift={props.shift}
    isFirst={props.isFirst}
    style={props.style}
    role={props.role}
    aria-level={props.ariaLevel}
  >
    {props.stripe !== "none" && (
      <Stripe
        rounded={props.variant !== "primary"}
        variant={props.variant ?? "primary"}
        position={props.stripe ?? "top"}
        length="100%"
      />
    )}
    {props.children}
  </StyledHeading>
);

Heading.defaultProps = {
  isFirst: false,
  stripe: "none",
  variant: "secondary",
};

interface HeadingProps {
  isFirst: boolean;
  stripe: "left" | "none";
  shift: string;
  as?: React.ElementType;
}

const StyledHeading = styled.h3<HeadingProps>`
  position: relative;
  display: block;
  margin: ${({ isFirst }) => (isFirst ? 0 : spacings.large)} 0
    ${spacings.medium} 0;
  color: ${({ theme }) => theme.title};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  line-height: ${fonts.lineHeight};
  ${({ stripe, shift }) => {
    if (stripe === "left") {
      return css`
        margin-left: ${shift ? `-${shift}` : "0"};
        padding-left: ${shift ? shift : spacings.base};
        @media (max-width: ${breakpoints.mobile}) {
          margin-left: -${spacings.small};
          padding-left: ${spacings.base};
        }
      `;
    }
  }};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
