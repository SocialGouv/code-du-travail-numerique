import React from "react";
import styled from "styled-components";
//import { Collapse } from "react-collapse";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/minimal-example.css";
//import "react-accessible-accordion/dist/fancy-example.css";

const faq = require("./data/faq.json");

const hasCommonItem = (arr1, arr2) => arr1.some(r => arr2.includes(r));

const isTheme = theme => entry =>
  (entry.themes && entry.themes.indexOf(theme.id) > -1) ||
  (entry.articles &&
    theme.articles &&
    hasCommonItem(entry.articles, theme.articles));

export const hasFaq = theme => faq.find(isTheme(theme));

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
    font-size: 1.2em;
    box-sizing: border-box;
    cursor: pointer;
    padding: 12px;
    width: 100%;
    text-align: left;
    border: none;
  }
  .accordion__body {
    padding: 0 30px;
    font-size: 1.2em;
    text-align: justify;
  }
`;

class Entry extends React.Component {
  state = {
    toggled: false
  };
  toggle = () => {
    this.setState(curState => ({ toggled: !curState.toggled }));
  };
  render() {
    const { question, reponse } = this.props;
    return (
      <div>
        <StyledAccordion>
          <AccordionItem>
            <AccordionItemTitle>
              <LinkText>«&nbsp;{question}&nbsp;»</LinkText>
            </AccordionItemTitle>
            <AccordionItemBody dangerouslySetInnerHTML={{ __html: reponse }} />
          </AccordionItem>
        </StyledAccordion>
      </div>
    );
  }
}

const FAQ = ({ theme }) =>
  faq.filter(isTheme(theme)).map(e => <Entry key={e.question} {...e} />);

export default FAQ;
