import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "@cdt/ui";
import TYPE_REFERENCE from "./typeReference";
import { references as referenceToBlocMapping } from "./mapping";
import Bloc from "./components/Bloc";
import AutresReferences from "./components/AutresReferences";

const { box, colors, spacing } = theme;

class ReferencesJuridiques extends React.PureComponent {
  render() {
    const { references } = this.props;
    // This one is a object of blocs that contains an array of references
    const concernedBlocs = new Map();
    const autresReferences = [];
    references.forEach(reference => {
      const upperCasedReferenceId = reference.id.toUpperCase();
      if (
        reference.type === TYPE_REFERENCE.codeDuTravail &&
        referenceToBlocMapping.has(upperCasedReferenceId)
      ) {
        const concernedBloc = referenceToBlocMapping.get(upperCasedReferenceId);
        if (concernedBlocs.has(concernedBloc)) {
          concernedBlocs.get(concernedBloc).push(reference);
        } else {
          concernedBlocs.set(concernedBloc, [reference]);
        }
      } else {
        autresReferences.push(reference);
      }
    });

    const blocElements = [];
    concernedBlocs.forEach((blocReferences, blocId) => {
      blocElements.push(
        <Bloc key={blocId} id={blocId} references={blocReferences} />
      );
    });

    return (
      <ReferencesWrapper>
        <h3>Références juridiques</h3>
        {blocElements}
        {autresReferences.length > 0 && (
          <AutresReferences references={autresReferences} />
        )}
      </ReferencesWrapper>
    );
  }
}

ReferencesJuridiques.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(TYPE_REFERENCE)).isRequired,
      id: PropTypes.string.isRequired
    })
  )
};

export default ReferencesJuridiques;

const ReferencesWrapper = styled.div`
  margin-top: ${spacing.large};
  padding: ${spacing.base};
  background-color: ${colors.lightBackground};
  border: 1px solid ${colors.elementBorder};
  border-radius: ${box.borderRadius};
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`;
