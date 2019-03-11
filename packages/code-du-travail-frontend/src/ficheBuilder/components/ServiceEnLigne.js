import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import elementBuilder from "../index";
import { colors, spacing, box } from "../cssVariables";

const ServiceEnLigne = ({ data }) => {
  const type = data._.type;
  const url = data._.URL;
  const title = elementBuilder(data.$[0].$);
  const source = elementBuilder(data.$[1].$);
  return (
    <Wrapper>
      <Type>{type}</Type>
      <ButtonLink href={url} target="_blank">
        {`${title}`}
      </ButtonLink>
      <Source>{source}</Source>
    </Wrapper>
  );
};

ServiceEnLigne.propTypes = {
  data: PropTypes.object.isRequired
};

export default ServiceEnLigne;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: ${spacing.large};
  background-color: ${colors.lighterGrey};
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
