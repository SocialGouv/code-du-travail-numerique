import React from "react";
import { ExternalLink } from "react-feather";
import styled from "styled-components";
import { Collapse } from "react-collapse";

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
  width: 90%;
  overflow: hidden;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
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
        <Link onClick={this.toggle} key={question} title={question}>
          <LinkText>« {question} » </LinkText>
        </Link>
        <Collapse isOpened={this.state.toggled}>
          <div dangerouslySetInnerHTML={{ __html: reponse }} />
        </Collapse>
      </div>
    );
  }
}

const FAQ = ({ theme }) =>
  faq.filter(isTheme(theme.id)).map(e => <Entry key={e.question} {...e} />);

export default FAQ;
