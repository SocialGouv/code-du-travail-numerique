import { theme } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { getText } from "../utils.js";
import { ElementBuilder } from "./ElementBuilder.js";

class OuSAdresser extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    headingLevel: PropTypes.number.isRequired,
  };
  render() {
    const { data, headingLevel } = this.props;
    const label = getText(
      data.children.find((child) => child.name === "Titre")
    );
    let content = null;
    if (data.children.find((child) => child.name === "RessourceWeb")) {
      const url = data.children.find((child) => child.name === "RessourceWeb")
        .attributes.URL;
      content = (
        <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          aria-label={`${label} (nouvelle fenêtre)`}
        >
          {label}
        </a>
      );
    } else {
      content = (
        <ElementBuilder
          data={data.children.find((child) => child.name === "Texte")}
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

const { breakpoints, colors, spacings, box } = theme;

const Wrapper = styled.div`
  margin-bottom: ${spacings.base};
  padding: ${spacings.large};
  background-color: ${colors.bgTertiary};
  border-radius: ${box.borderRadius};
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacings.small} ${spacings.medium};
  }
`;
const Title = styled.strong`
  display: block;
  margin-bottom: ${spacings.tiny};
`;
