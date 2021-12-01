import { Progress, Text, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { PAGES_NUMBER } from "../reducer";

export const ProgressBar = ({ state }) => (
  <>
    <StyledText
      fontSize="tiny"
      fontWeight="600"
      variant="primary"
      aria-level="2"
      role="heading"
    >
      QUESTION {state.pageNumber} SUR {PAGES_NUMBER}
    </StyledText>
    <StyledProgress ratio={state.pageNumber / PAGES_NUMBER} />
  </>
);

const { spacings } = theme;

const StyledText = styled(Text)`
  display: block;
  margin-bottom: ${spacings.xsmall};
`;
const StyledProgress = styled(Progress)`
  margin-bottom: ${spacings.large};
`;
