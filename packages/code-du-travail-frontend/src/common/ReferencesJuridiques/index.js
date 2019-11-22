import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Accordion,
  Container,
  Section,
  theme,
  Title,
  Wrapper
} from "@socialgouv/react-ui";
import ReferenceList from "./ReferenceList";
import TYPE_REFERENCE from "./typeReference";

const { spacings } = theme;

class ReferencesJuridiques extends React.PureComponent {
  render() {
    const { references } = this.props;
    if (!references.length) return null;

    const items = [
      {
        title: "Voir références juridiques concernées",
        body: <ReferenceList references={references} />
      }
    ];

    return (
      <StyledSection>
        <Container>
          <Wrapper variant="light">
            <Title>Références juridiques</Title>
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
  padding-top: ${spacings.base};
  padding-bottom: ${spacings.base};
`;
