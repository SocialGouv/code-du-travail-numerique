import { AccordionArrow, Text } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { matopush } from "../../piwik";

type Props = {
  children: React.ReactNode;
};

const ShowDetails = ({ children }: Props): JSX.Element => {
  const [active, setActive] = React.useState(false);
  const [height, setHeight] = React.useState("0px");
  const contentSpace = React.useRef(null);

  function toggleAccordion() {
    setActive(!active);
    setHeight(!active ? `${contentSpace.current.scrollHeight}px` : "0");
    matopush(["TRACK_EVENT", "OUTIL", ""]); // TODO replace with events
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
          Voir le détail du calcul
        </Text>
      </StyledLink>
      <ResultsWithTransition
        active={active}
        maxHeight={`${height}`}
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
  padding: 1.6rem;
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

export default ShowDetails;
