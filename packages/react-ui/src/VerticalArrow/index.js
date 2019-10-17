import styled from "styled-components";

export const VerticalArrow = styled.div.attrs(() => ({
  role: "presentation"
}))`
  position: relative;
  display: inline-block;
  flex: 0 0 auto;
  width: 24px;
  height: 12px;

  &::after,
  &::before {
    position: absolute;
    top: 50%;
    display: block;
    width: 10px;
    height: 2px;
    background-color: currentColor;
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
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
`;
