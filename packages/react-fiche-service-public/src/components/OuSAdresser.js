import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { theme } from "@cdt/ui-old";

import { ElementBuilder } from "./ElementBuilder";
import { getText } from "../utils";

const { colors, spacing, box } = theme;

class OuSAdresser extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    headingLevel: PropTypes.number.isRequired
  };
  render() {
    const { data, headingLevel } = this.props;
    const label = getText(data.children.find(child => child.name === "Titre"));
    let content = null;
    if (data.children.find(child => child.name === "RessourceWeb")) {
      const url = data.children.find(child => child.name === "RessourceWeb")
        .attributes.URL;
      content = (
        <a href={url} rel="noopener noreferrer" target="_blank">
          {label}
        </a>
      );
    } else {
      content = (
        <ElementBuilder
          data={data.children.find(child => child.name === "Texte")}
          headingLevel={headingLevel + 1}
        />
      );
    }
    return (
      <Wrapper>
        <Title>{"Ou s'adresser ?"}</Title>
        {content}
      </Wrapper>
    );
  }
}

export default OuSAdresser;

const Wrapper = styled.div`
  padding: ${spacing.large};
  margin-bottom: ${spacing.base};
  background-color: ${colors.darkBackground};
  border-radius: ${box.borderRadius};
`;
const Title = styled.strong`
  display: block;
  margin-bottom: ${spacing.xsmall};
`;
