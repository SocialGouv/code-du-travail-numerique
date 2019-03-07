import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import { colors, spacing, box } from "../cssVariables";
import { SrOnly } from "../cssComponents";
import elementBuilder from "../index";
import { getText } from "../utils";

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    const { data, headingLevel: previousHeadingLevel } = props;
    const firstIndexOfAccordionItem = data.$.findIndex(element => element.name === "Chapitre")
    const AccordionItems = data.$.filter(element => element.name === "Chapitre")
    const beforeAccordionElements = data.$.slice(0, firstIndexOfAccordionItem);
    const afterAccordionElements = data.$.slice(firstIndexOfAccordionItem + AccordionItems.length);
    this.state = {  };
  }
  render() {
    const {  } = this.state;
    return (
    );
  }
}

Accordion.propTypes = {
  data: PropTypes.object.isRequired,
  headingLevel: PropTypes.number.isRequired
};

export default Accordion;

const StyledAccordion = styled(Accordion)``;
