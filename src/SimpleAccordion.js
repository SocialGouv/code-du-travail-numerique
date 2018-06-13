import React from "react";
import styled from "styled-components";
import { ChevronsDown } from "react-feather";

import "react-accessible-accordion/dist/minimal-example.css";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

const LinkText = styled.div`
  display: inline-block;
  width: 100%;
  xoverflow: hidden;
  cursor: pointer;
  xwhite-space: nowrap;
  xtext-overflow: ellipsis;
`;

const StyledAccordion = styled(Accordion)`
  background-color: white;
  border: 1px solid ${props => props.theme.light2};
  margin: 5px;
  line-height: 1.8em;
  .accordion__title {
    color: #444;
    font-size: 1rem;
    box-sizing: border-box;
    cursor: pointer;
    padding: 12px;
    width: 100%;
    text-align: left;
    border: none;
  }
  .accordion__body {
    padding: 10px 30px;
    font-size: 1rem;
    text-align: justify;
  }
`;

const SimpleAccordion = ({ title, content }) => (
  <StyledAccordion>
    <AccordionItem>
      <AccordionItemTitle>
        <LinkText>
          {title}
          <ChevronsDown size={24} style={{ float: "right" }} />
        </LinkText>
      </AccordionItemTitle>
      <AccordionItemBody dangerouslySetInnerHTML={{ __html: content }} />
    </AccordionItem>
  </StyledAccordion>
);

export default SimpleAccordion;
