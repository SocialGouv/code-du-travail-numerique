import { Container, Section, theme } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import styled from "styled-components";

const { breakpoints, spacings } = theme;

export const MainAsideLayout = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  padding: 0;
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0;
  }
`;

export const MainContent = styled.div`
  width: ${(props) => (props.hasResults ? "70%" : "80%")};
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

export const AsideContent = styled(Section)`
  position: ${(props) => (props.sticky ? "sticky" : "static")};
  top: 16rem;
  z-index: 1;
  width: calc(30% - ${spacings.larger});
  margin-left: ${spacings.larger};
  @media (min-width: ${breakpoints.tablet}) {
    padding-top: 0;
  }
  @media (max-width: ${breakpoints.desktop}) {
    width: 30%;
    margin: 0;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
  @media print {
    display: none;
  }
`;

AsideContent.propTypes = {
  sticky: PropTypes.bool,
};
AsideContent.defaultProps = {
  sticky: false,
};
