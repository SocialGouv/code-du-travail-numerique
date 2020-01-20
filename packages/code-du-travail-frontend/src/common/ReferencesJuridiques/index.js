import React from "react";
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

    const items = [
      {
        title: <h3>Voir les références juridiques concernées</h3>,
        body: <ReferenceList references={references} />
      }
    ];

    return (
      <Section>
        <Container>
          <Wrapper variant="light">
            <Heading>Références juridiques</Heading>
            <Accordion items={items} />
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
