import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "@socialgouv/react-ui";

import { getText } from "../utils";

const { colors, spacing, box } = theme;

class ServiceEnLigne extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  };
  render() {
    const { data } = this.props;
    const type = data.attributes.type;
    const url = data.attributes.URL;
    const title = getText(data.children[0]);
    const source = getText(data.children[1]);
    return (
      <Wrapper>
        <Type>{type}</Type>
        <ButtonLink
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          className="no-after"
        >
          {title}
        </ButtonLink>
        <Source>{source}</Source>
      </Wrapper>
    );
  }
}

export default ServiceEnLigne;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-bottom: ${spacing.base};
  padding: ${spacing.large};
  background-color: ${colors.darkBackground};
  border-radius: ${box.borderRadius};
`;

const Type = styled.div`
  align-self: flex-start;
  margin-bottom: ${spacing.xsmall};
  font-weight: bold;
  font-size: 1.1rem;
  color: ${colors.blueDark};
`;

const ButtonLink = styled.a`
  &:link,
  &:visited {
    display: inline-block;
    background-color: ${colors.blueDark};
    color: ${colors.primaryText};
    text-decoration: none;
    padding: ${spacing.xsmall};
    border-radius: ${box.borderRadius};
  }
  &:hover,
  &:focus,
  &:active {
    background-color: ${colors.blueDark};
  }
`;

const Source = styled.small`
  display: inline-block;
  margin-top: ${spacing.xsmall};
  color: ${colors.darkGrey};
`;
