import { SOURCES } from "@socialgouv/cdtn-sources";
import { Collapse, theme, Wrapper } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import ReferenceList from "./ReferenceList";

class References extends React.PureComponent {
  render() {
    const { label, references, accordionDisplay, ...props } = this.props;
    if (!references.length) return null;

    return (
      <>
        {references.length > accordionDisplay ? (
          <StyledWrapper variant="light" {...props}>
            <Collapse title={label}>
              <ReferenceList references={references} />
            </Collapse>
          </StyledWrapper>
        ) : (
          <Wrapper variant="light" {...props}>
            <Div>{label}</Div>
            <ReferenceList references={references} />
          </Wrapper>
        )}
      </>
    );
  }
}

References.propTypes = {
  accordionDisplay: PropTypes.number,
  label: PropTypes.string,
  references: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(SOURCES)).isRequired,
      url: PropTypes.string,
    })
  ),
};

References.defaultProps = {
  accordionDisplay: 2,
  label: "Références juridiques concernées :",
  references: [],
};

export default References;

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
