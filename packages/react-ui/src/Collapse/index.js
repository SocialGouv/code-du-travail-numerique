import PropTypes from "prop-types";
import React from "react";
// import AccordionArrow from "../Accordion/";
// import { AccordionArrow, Text } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

import { AccordionArrow } from "../Accordion";
import { Text } from "../Text";
import { spacings } from "../theme.js";

export const Collapse = ({ title, children, onClickHandler }) => {
  const [active, setActive] = React.useState(false);
  const [height, setHeight] = React.useState("0px");
  const contentSpace = React.useRef(null);

  function toggleAccordion() {
    setActive(!active);
    setHeight(!active ? `${contentSpace.current.scrollHeight}px` : "0");
    onClickHandler && onClickHandler();
  }

  return (
    <div>
      <StyledLink
        onClick={toggleAccordion}
        aria-expanded={active}
        tabindex="0"
        role="button"
      >
        <AccordionArrow aria-hidden="true" />
        <Text fontSize="hsmall" fontWeight="600">
          {title}
        </Text>
      </StyledLink>
      <ResultsWithTransition
        active={active}
        maxHeight={height}
        ref={contentSpace}
      >
        {children}
      </ResultsWithTransition>
    </div>
  );
};

const ResultsWithTransition = styled.div`
  overflow: auto;
  max-height: ${({ maxHeight }) => maxHeight};
  opacity: ${({ active }) => (active ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
  padding: ${spacings.base};
`;
const StyledLink = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  overflow: hidden;
  cursor: pointer;
  margin-top: 40px;

  &:hover,
  &:focus,
  &:focus-within,
  &[aria-expanded="true"] {
    color: ${({ theme }) => theme.paragraph};
  }
`;
Collapse.propTypes = {
  children: PropTypes.node.isRequired,
  onClickHandler: PropTypes.func,
  title: PropTypes.string,
};
