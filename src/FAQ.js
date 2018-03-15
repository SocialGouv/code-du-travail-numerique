import React from "react";
import styled from "styled-components";

import SimpleAccordion from "./SimpleAccordion";

const faq = require("./data/faq.json");

const hasCommonItem = (arr1, arr2) => arr1.some(r => arr2.includes(r));

const isTheme = theme => entry =>
  (entry.themes && entry.themes.indexOf(theme.id) > -1) ||
  (entry.articles &&
    theme.articles &&
    hasCommonItem(entry.articles, theme.articles));

export const hasFaq = theme => faq.find(isTheme(theme));

class Entry extends React.Component {
  state = {
    toggled: false
  };
  toggle = () => {
    this.setState(curState => ({ toggled: !curState.toggled }));
  };
  render() {
    const { question, reponse } = this.props;
    return <SimpleAccordion title={question} content={reponse} />;
  }
}

const FAQ = ({ theme }) =>
  faq.filter(isTheme(theme)).map(e => <Entry key={e.question} {...e} />);

export default FAQ;
