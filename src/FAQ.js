import React from "react";
import { ExternalLink } from "react-feather";
import styled from "styled-components";

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
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const FAQ = ({ theme }) =>
  faq.filter(isTheme(theme.id)).map(entry => (
    <Link key={entry.question} href="#" title={entry.question}>
      <LinkText>« {entry.question} » </LinkText>
      <ExternalLink style={{ verticalAlign: "top" }} size="12" />
    </Link>
  ));

export default FAQ;
