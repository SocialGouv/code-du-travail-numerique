import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { colors } from "../theme.js";

export const CodeSnippet = ({ children }) => (
  <Code>
    <pre>{children}</pre>
  </Code>
);
const Code = styled.div`
  width: auto;
  padding: 0.2em 0.6em;
  overflow: auto;
  background: ${colors.bgPrimary};
  border: solid ${colors.border};
  border-width: 0.1em 0.1em 0.1em 0.8em;
`;

CodeSnippet.propTypes = {
  children: PropTypes.node.isRequired,
};
