import React from "react";
import styled from "styled-components";

import { Config } from "../icons/index.js";
import { box } from "../theme";

type BadgeProps = {
  icon?: React.ElementType;
  variant?: "primary" | "secondary";
};

export const Badge = ({
  icon: Icon = Config,
  variant = "primary",
  ...props
}: BadgeProps) => (
  <StyledBadge variant={variant} {...props}>
    <IconWrapper>
      <Icon />
    </IconWrapper>
  </StyledBadge>
);

const DIMENSION = "5rem";

type StyledBadgeProps = {
  variant: "primary" | "secondary";
};

const StyledBadge = styled.div<StyledBadgeProps>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${DIMENSION};
  height: ${DIMENSION};
  overflow: hidden;
  color: ${({ variant, theme }) => theme[variant + "Text"]};
  border-radius: 0 ${box.borderRadius} 0 0;

  &:before {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent ${({ variant, theme }) => theme[variant]}
      transparent transparent;
    border-style: solid;
    border-width: 0 ${DIMENSION} ${DIMENSION} 0;
    content: "";
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 3rem;
  height: 3rem;
`;
