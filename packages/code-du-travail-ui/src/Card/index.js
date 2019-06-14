import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { breakpoints, spacing } from "../theme";

export default function Card({ children, ...props }) {
  return <Li {...props}>{children}</Li>;
}

Card.propTypes = {
  children: PropTypes.node
};

const Li = styled.li`
  flex-shrink: 1;
  flex-grow: 1;
  margin: ${spacing.interComponent};
  padding: ${spacing.base};
  width: calc(100% / 3 - 2 * ${spacing.interComponent});
  list-style-type: none;
  background-color: white;
  @media (max-width: ${breakpoints.tablet}) {
    width: calc(100% / 2 - 2 * ${spacing.interComponent});
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: calc(100% - 1 * ${spacing.interComponent});
  }
`;
