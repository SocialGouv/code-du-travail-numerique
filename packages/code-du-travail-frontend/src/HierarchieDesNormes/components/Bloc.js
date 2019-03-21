import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Accordion, theme } from "@cdt/ui";
import TYPE_REFERENCE from "../typeReference";
import { CodeDuTravailLink } from "./links";

import { blocs } from "../mapping";

const { box, colors, spacing } = theme;

class Bloc extends React.PureComponent {
  render() {
    const { id, references } = this.props;
    const { title, text } = blocs[id];
    const referenceList = (
      <ul>
        {references.map(reference => (
          <li key={reference.id}>
            <CodeDuTravailLink title={reference.title} slug={reference.id} />
          </li>
        ))}
      </ul>
    );
    const items = [
      {
        title: "Voir les articles du code du travail concernés",
        body: referenceList
      }
    ];
    return (
      <BlocWrapper>
        <h4>{title}</h4>
        <p>{text}</p>
        <Accordion items={items} />
      </BlocWrapper>
    );
  }
}

Bloc.propTypes = {
  id: PropTypes.string.isRequired,
  references: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(TYPE_REFERENCE)).isRequired,
      id: PropTypes.string.isRequired
    })
  )
};

export default Bloc;

const BlocWrapper = styled.div`
  margin: ${spacing.large} 0;
  padding: ${spacing.base};
  background-color: ${colors.darkBackground};
  border: 1px solid ${colors.elementBorder};
  border-radius: ${box.borderRadius};
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`;
