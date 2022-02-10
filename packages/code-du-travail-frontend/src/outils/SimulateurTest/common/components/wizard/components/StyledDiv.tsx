import { theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

import { STEP_LIST_WIDTH } from "../../../../../common/StepList";

const { breakpoints } = theme;
//TODO: mettre dans un autre fichier
export const StyledDiv = styled.div`
  padding: 0 0 0 ${STEP_LIST_WIDTH};
  overflow: visible;
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
  }
  @media print {
    border: 0;
  }
`;
