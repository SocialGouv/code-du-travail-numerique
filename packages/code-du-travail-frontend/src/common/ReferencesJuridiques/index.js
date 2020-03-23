import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Accordion, Heading, Wrapper, theme } from "@socialgouv/react-ui";
import ReferenceList from "./ReferenceList";
import TYPE_REFERENCE from "./typeReference";

class ReferencesJuridiques extends React.PureComponent {
  render() {
    const { references, ...props } = this.props;
    if (!references.length) return null;

    return (
      <>
        {references.length > 2 ? (
          <StyledWrapper variant="light" {...props}>
            <Accordion
              items={[
                {
                  title: <h3>Voir les références juridiques concernées</h3>,
                  body: <ReferenceList references={references} />,
                },
              ]}
            />
          </StyledWrapper>
        ) : (
          <Wrapper variant="light" {...props}>
            <Heading as="div">Références juridiques concernées&nbsp;:</Heading>
            <ReferenceList references={references} />
          </Wrapper>
        )}
      </>
    );
  }
}

ReferencesJuridiques.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(TYPE_REFERENCE)).isRequired,
      url: PropTypes.string,
    })
  ),
};

ReferencesJuridiques.defaultProps = {
  references: [],
};

export default ReferencesJuridiques;

const { breakpoints } = theme;

const StyledWrapper = styled(Wrapper)`
  padding-top: 0;
  padding-bottom: 0;
  @media (max-width: ${breakpoints.mobile}) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;
