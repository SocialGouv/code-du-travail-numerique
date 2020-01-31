import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  Accordion,
  Container,
  Heading,
  Section,
  Wrapper
} from "@socialgouv/react-ui";
import ReferenceList from "./ReferenceList";
import TYPE_REFERENCE from "./typeReference";

class ReferencesJuridiques extends React.PureComponent {
  render() {
    const { references } = this.props;
    if (!references.length) return null;

    return (
      <Section>
        <Container>
          <Wrapper variant="light">
            <StyledHeading>Références juridiques</StyledHeading>
            {references.length > 2 ? (
              <Accordion
                items={[
                  {
                    title: <h3>Voir les références juridiques concernées</h3>,
                    body: <ReferenceList references={references} />
                  }
                ]}
              />
            ) : (
              <ReferenceList references={references} />
            )}
          </Wrapper>
        </Container>
      </Section>
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

const StyledHeading = styled(Heading)`
  color: ${({ theme }) => theme.altText};
`;
