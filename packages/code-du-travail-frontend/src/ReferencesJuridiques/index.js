import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Section, theme, Wrapper } from "@cdt/ui-old";
import TYPE_REFERENCE from "./typeReference";
import { mapReferencesToBlocs } from "./mapping";
import HierarchieBloc from "./components/HierarchieBloc";
import AutresReferences from "./components/AutresReferences";

const { spacing } = theme;

class ReferencesJuridiques extends React.PureComponent {
  render() {
    const { references } = this.props;
    if (!references.length) return null;
    // concernedBlocs is a map of blocIds with an array of references
    // autresReferences is simply an array of references not linked to any bloc
    const { concernedBlocs, autresReferences } = mapReferencesToBlocs(
      references
    );

    const hierarchieBlocElements = [];
    concernedBlocs.forEach((references, blocId) => {
      hierarchieBlocElements.push(
        <HierarchieBloc key={blocId} id={blocId} references={references} />
      );
    });

    const explanatoryText =
      hierarchieBlocElements.length > 0 && references.length > 1 ? (
        <p>
          {`Attention, en fonction des articles du Code du travail, un accord de branche ou un
            accord d'entreprise peut définir le droit applicable. Nous vous précisons ci-dessous
            quel texte juridique est applicable pour les différents articles du Code du travail liés
            à cette réponse.`}
        </p>
      ) : null;

    return (
      <StyledSection>
        <Container>
          <Wrapper variant="light">
            <h2>Références juridiques</h2>
            {explanatoryText}
            {hierarchieBlocElements}
            {autresReferences.length > 0 && (
              <AutresReferences
                references={autresReferences}
                showTitle={hierarchieBlocElements.length > 0}
              />
            )}
          </Wrapper>
        </Container>
      </StyledSection>
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

ReferencesJuridiques.defaultProps = {
  references: []
};

export default ReferencesJuridiques;

const StyledSection = styled(Section)`
  padding-top: ${spacing.base};
  padding-bottom: ${spacing.base};
`;
