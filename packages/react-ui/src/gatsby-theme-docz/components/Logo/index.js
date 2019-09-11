import React from "react";
import styled from "styled-components";
import { useConfig } from "docz";

export const Logo = () => {
  const config = useConfig();
  return <StyledLink href="/">{config.title}</StyledLink>;
};

const StyledLink = styled.a`
  letter-spacing: -0.02em;
  font-weight: 600;
  font-size: 2rem;
  color: #2d3747;
  text-decoration: none;
  :hover {
    color: #0b5fff;
  }
`;
