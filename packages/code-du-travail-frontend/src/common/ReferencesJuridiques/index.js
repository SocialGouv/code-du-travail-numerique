import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Accordion, Wrapper, theme } from "@socialgouv/react-ui";
import ReferenceList from "./ReferenceList";
import TYPE_REFERENCE from "./typeReference";

class ReferencesJuridiques extends React.PureComponent {
  render() {
    const { references, accordionDisplay, ...props } = this.props;
    if (!references.length) return null;

    return (
      <>
        {references.length > accordionDisplay ? (
          <StyledWrapper variant="light" {...props}>
            <Accordion
              noTitle
              items={[
                {
                  title: <div>Voir les références juridiques concernées</div>,
                  body: <ReferenceList references={references} />,
                },
              ]}
            />
          </StyledWrapper>
        ) : (
          <Wrapper variant="light" {...props}>
            <Div>Références juridiques concernées&nbsp;:</Div>
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
  accordionDisplay: PropTypes.number,
};

ReferencesJuridiques.defaultProps = {
  references: [],
  accordionDisplay: 2,
};

export default ReferencesJuridiques;

const { breakpoints, spacings } = theme;

const StyledWrapper = styled(Wrapper)`
  padding-top: 0;
  padding-bottom: 0;
  @media (max-width: ${breakpoints.mobile}) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const Div = styled.div`
  margin-bottom: ${spacings.medium};
  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: ${spacings.base};
  }
`;
