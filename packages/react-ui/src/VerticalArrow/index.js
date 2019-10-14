import styled from "styled-components";

export const VerticalArrow = styled.div.attrs(() => ({
  role: "presentation"
}))`
  flex: 0 0 auto;
  display: inline-block;
  position: relative;
  width: 24px;
  height: 12px;

  &::after,
  &::before {
    display: block;
    position: absolute;
    top: 50%;
    width: 10px;
    height: 2px;
    background-color: currentColor;
    content: "";
  }

  &::before {
    left: 4px;
    transform: rotate(45deg);
  }

  [aria-expanded="true"] &::before,
  [aria-selected="true"] &::before {
    transform: rotate(-45deg);
  }

  &::after {
    right: 4px;
    transform: rotate(-45deg);
  }

  [aria-expanded="true"] &::after,
  [aria-selected="true"] &::after {
    transform: rotate(45deg);
  }

  &::before,
  &::after {
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
  }
`;
