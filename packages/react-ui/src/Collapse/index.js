import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { AccordionArrow } from "../Accordion";
import { Button } from "../Button";
import { spacings } from "../theme.js";

export const Collapse = ({ title, children, onClickHandler, textProps }) => {
  const [active, setActive] = React.useState(false);
  const [height, setHeight] = React.useState("0px");
  const contentSpace = React.useRef(null);

  function toggleAccordion() {
    setActive(!active);
    setHeight(!active ? `${contentSpace.current.scrollHeight + 5}px` : "0");
    onClickHandler && onClickHandler();
  }

  return (
    <div>
      <StyledLink
        onClick={toggleAccordion}
        aria-expanded={active}
        tabindex="0"
        variant="naked"
        narrow
        type="button"
      >
        <AccordionArrow aria-hidden="true" />
        <StyledText noMargin fontSize="hsmall" fontWeight="600" {...textProps}>
          {title}
        </StyledText>
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
  display: ${({ active }) => (active ? "block" : "none")};
`;
const StyledLink = styled(Button)`
  align-items: stretch;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;

  &:hover,
  &:focus,
  &:focus-within,
  &[aria-expanded="true"] {
    color: ${({ theme }) => theme.paragraph};
  }
`;
const StyledText = styled.div`
  margin-left: ${spacings.small};
`;

Collapse.propTypes = {
  children: PropTypes.node.isRequired,
  onClickHandler: PropTypes.func,
  textProps: PropTypes.object,
  title: PropTypes.string,
};
