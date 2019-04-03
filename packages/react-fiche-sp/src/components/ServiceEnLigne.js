import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "@cdt/ui";

import { getText } from "../utils";

const { colors, spacing, box } = theme;

class ServiceEnLigne extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  };
  render() {
    const { data } = this.props;
    const type = data._.type;
    const url = data._.URL;
    const title = getText(data.$[0]);
    const source = getText(data.$[1]);
    return (
      <Wrapper>
        <Type>{type}</Type>
        <ButtonLink href={url} rel="noopener noreferrer" target="_blank">
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
  color: ${colors.title};
`;

const ButtonLink = styled.a`
  &:link,
  &:visited {
    display: inline-block;
    background-color: ${colors.primaryBackground};
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
