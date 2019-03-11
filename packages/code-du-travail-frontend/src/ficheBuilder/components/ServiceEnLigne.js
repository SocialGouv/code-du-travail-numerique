import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { childrenBuilder } from "../index";
import cssVars from "../cssVariables";

const ServiceEnLigne = ({ data }) => {
  const type = data._.type;
  const url = data._.URL;
  const title = childrenBuilder(data.$[0]);
  const source = childrenBuilder(data.$[1]);
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
  padding: ${cssVars.spacing};
  background-color: ${cssVars.veryLightGrey};
  border-radius: ${cssVars.borderRadius};
`;

const Type = styled.div`
  align-self: flex-start;
  margin-bottom: ${cssVars.lightSpacing};
`;

const ButtonLink = styled.a`
  &:link,
  &:visited {
    display: inline-block;
    background-color: ${cssVars.blue};
    color: ${cssVars.white};
    text-decoration: none;
    padding: ${cssVars.buttonThickness};
    border-radius: ${cssVars.borderRadius};
  }
  &:hover,
  &:focus,
  &:active {
    background-color: ${cssVars.darkBlue};
  }
`;

const Source = styled.small`
  display: inline-block;
  margin-top: ${cssVars.minimalSpacing};
  color: ${cssVars.lightGrey};
`;
