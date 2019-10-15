import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Accordion,
  Container,
  Section,
  theme,
  Wrapper
} from "@socialgouv/react-ui";
import ReferenceList from "./ReferenceList";
import TYPE_REFERENCE from "./typeReference";

const { spacing } = theme;

class ReferencesJuridiques extends React.PureComponent {
  render() {
    const { references } = this.props;
    if (!references.length) return null;

    const items = [
      {
        title: <StyledSpan>Voir références juridiques concernées</StyledSpan>,
        body: <ReferenceList references={references} />
      }
    ];

    return (
      <StyledSection>
        <Container>
          <Wrapper variant="light">
            <h2>Références juridiques</h2>
            <Accordion items={items} />
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

const StyledSpan = styled.span`
  display: inline-block;
  padding: ${spacing.base};
`;
