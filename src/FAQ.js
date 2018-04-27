import React from "react";
import { ExternalLink } from "react-feather";
import styled from "styled-components";
//import { Collapse } from "react-collapse";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

//import "react-accessible-accordion/dist/minimal-example.css";
import "react-accessible-accordion/dist/fancy-example.css";

const faq = require("./data/faq.json");

const isTheme = themeId => entry =>
  entry.themes && entry.themes.indexOf(themeId) > -1;

export const hasFaq = theme => faq.find(isTheme(theme.id));

const Link = styled.a`
  display: block;
  text-decoration: none;
  margin: 10px 0;
  &:hover {
    text-decoration: underline;
  }
`;

const LinkText = styled.div`
  display: inline-block;
  width: 100%;
  xoverflow: hidden;
  cursor: pointer;
  xwhite-space: nowrap;
  xtext-overflow: ellipsis;
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
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle>
              <LinkText>«&nbsp;{question}&nbsp;»</LinkText>
            </AccordionItemTitle>
            <AccordionItemBody>
              <div dangerouslySetInnerHTML={{ __html: reponse }} />
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}

const FAQ = ({ theme }) =>
  faq.filter(isTheme(theme.id)).map(e => <Entry key={e.question} {...e} />);

export default FAQ;
