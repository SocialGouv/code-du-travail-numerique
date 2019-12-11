import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { animations, box, fonts, spacings } from "../theme";

export const Select = ({ children, ...props }) => (
  <StyledSelect {...props}>{children}</StyledSelect>
);

Select.propTypes = {
  children: PropTypes.node.isRequired
};

const INPUT_HEIGHT = "5.4rem";

const StyledSelect = styled.select`
  width: 40rem;
  max-width: 100%;
  height: ${INPUT_HEIGHT};
  padding: 0 ${spacings.medium};
  padding-right: ${spacings.large};
  color: ${({ theme }) => theme.paragraph};
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  vertical-align: middle;
  background: ${({ theme }) => theme.white}
    url("data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+PHBhdGggZD0iTTguNDI1IDExLjU3M2w3LjExLTYuMDcyYS43MDkuNzA5IDAgMDAuMjYtLjUzNy43MDkuNzA5IDAgMDAtLjI2LS41MzcuOTczLjk3MyAwIDAwLS42MjktLjIyMy45NzMuOTczIDAgMDAtLjYzLjIyM2wtNi40OCA1LjUzNi02LjQ4MS01LjUzNmEuOTczLjk3MyAwIDAwLS42My0uMjIzLjk3My45NzMgMCAwMC0uNjI4LjIyMy43MDguNzA4IDAgMDAtLjI2MS41MzdjMCAuMjAyLjA5NC4zOTUuMjYuNTM3bDcuMTEgNi4wNzJhLjkxLjkxIDAgMDAuMjkuMTY1IDEuMDIxIDEuMDIxIDAgMDAuNjggMCAuOTEuOTEgMCAwMC4yOS0uMTY1eiIgZmlsbD0icmdiKDI1NSwgMTEyLCAxMDMpIi8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iY2xpcDAiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTAgMGgxNnYxNkgweiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==")
    no-repeat;
  background-position: top ${spacings.medium} right ${spacings.medium};
  background-size: 1.6rem;
  border: none;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  cursor: pointer;
  transition: border-color ${animations.transitionTiming} ease;
  appearance: none;
  &:disabled {
    background-color: ${({ theme }) => theme.bgTertiary};
  }
`;
