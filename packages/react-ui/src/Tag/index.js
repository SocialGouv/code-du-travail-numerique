import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { Text } from "../Text/index.js";
import { box, spacings } from "../theme.js";

export function Tag({ children }) {
  return (
    <StyledText fontWeight="600" fontSize="small">
      {children}
    </StyledText>
  );
}

const StyledText = styled(Text)`
  display: inline-block;
  padding: ${spacings.tiny} ${spacings.xsmall};
  color: ${({ theme }) => theme.title};
  background-color: ${({ theme }) => theme.bgSecondary};
  border-radius: ${box.borderRadius};
`;

Tag.propTypes = {
  children: PropTypes.node,
};
