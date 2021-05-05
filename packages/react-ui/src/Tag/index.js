import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { Text } from "../Text";
import { box, spacings } from "../theme";

export function Tag({ children }) {
  return (
    <StyledText fontWeight={600} fontSize="small">
      {children}
    </StyledText>
  );
}

const StyledText = styled(Text)`
  display: inline-block;
  background-color: ${({ theme }) => theme.bgSecondary};
  color: ${({ theme }) => theme.title};
  padding: ${spacings.tiny} ${spacings.xsmall};
  border-radius: ${box.borderRadius};
`;

Tag.propTypes = {
  children: PropTypes.node,
};
