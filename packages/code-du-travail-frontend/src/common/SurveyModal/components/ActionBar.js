import { theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

const { breakpoints, spacings } = theme;

export const ActionBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  margin-top: ${spacings.medium};
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    & button:first-child {
      margin-bottom: ${spacings.small};
    }
  }
`;
