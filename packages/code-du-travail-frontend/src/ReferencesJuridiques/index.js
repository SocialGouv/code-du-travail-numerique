import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Section, theme, Wrapper } from "@cdt/ui";
import TYPE_REFERENCE from "./typeReference";
import { mapReferencesToBlocs } from "./mapping";
import HierarchieBloc from "./components/HierarchieBloc";
import AutresReferences from "./components/AutresReferences";

const { spacing } = theme;

class ReferencesJuridiques extends React.PureComponent {
  render() {
    const { references } = this.props;

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
      hierarchieBlocElements.length && references.length > 1 ? (
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
            <StyledHeading>Références juridiques</StyledHeading>
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

export default ReferencesJuridiques;

const StyledSection = styled(Section)`
  padding-top: ${spacing.base};
  padding-bottom: ${spacing.base};
`;

const StyledHeading = styled.h2`
  font-weight: bold;
`;
