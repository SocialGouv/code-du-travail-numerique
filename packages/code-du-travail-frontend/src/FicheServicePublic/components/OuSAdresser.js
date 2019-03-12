import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors, spacing, box } from "../css/variables";
import { getText } from "../utils";

class ServiceEnLigne extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  };
  render() {
    const { data } = this.props;
    const label = getText(data.$.find(child => child.name === "Titre"));
    const url = data.$.find(child => child.name === "RessourceWeb")._.URL;
    return (
      <Wrapper>
        <Title>{"Ou s'adresser ?"}</Title>
        <a href={url} rel="noopener noreferrer" target="_blank">
          {label}
        </a>
      </Wrapper>
    );
  }
}

export default ServiceEnLigne;

const Wrapper = styled.div`
  display: inline-block;
  padding: ${spacing.large};
  background-color: ${colors.lighterGrey};
  border-radius: ${box.borderRadius};
`;
const Title = styled.strong`
  display: block;
  margin-bottom: ${spacing.xsmall};
`;
