import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { spacing } from "../theme";

export default function Cards({ children, ...props }) {
  return <Ul {...props}>{children}</Ul>;
}

Cards.propTypes = {
  children: PropTypes.node
};

const Ul = styled.ul`
  display: flex;
  flex-flow: wrap;
  margin: 0 calc(${spacing.interComponent} * -1);
  padding: 0;
`;
