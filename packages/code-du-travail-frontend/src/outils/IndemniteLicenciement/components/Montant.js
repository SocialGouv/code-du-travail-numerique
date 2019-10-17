import React from "react";
import { theme } from "@socialgouv/react-ui";
import styled from "styled-components";

function Montant({ value, primary, ratio = 1 }) {
  return (
    <Wrapper>
      <Bar primary={primary} ratio={ratio} />
      <Value primary={primary}>
        {value.toLocaleString("fr-FR", {
          maximumFractionDigit: 2,
          minimumFractionDigits: 2
        })}
        &nbsp;€ brut
      </Value>
    </Wrapper>
  );
}
export { Montant };

const { box, breakpoints, colors, fonts, spacing } = theme;

const Wrapper = styled.div`
  display: flex;
  @media (max-width: ${breakpoints.tablet}) {
    flex-flow: wrap;
  }
`;

const Bar = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${({ ratio }) => `calc(50% * ${ratio})`};
  padding: 1em;
  background-color: ${({ primary }) =>
    primary ? colors.blue : colors.lightText};
  border-radius: ${box.borderRadius};
  @media (max-width: ${breakpoints.tablet}) {
    width: ${({ ratio }) => `calc(100% * ${ratio})`};
  }
`;
const Value = styled.span`
  margin-left: ${spacing.base};
  color: ${({ primary }) => (primary ? colors.blue : colors.lightText)};
  font-size: ${({ primary }) => (primary ? fonts.sizeH2 : fonts.sizeH4)};
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    margin-left: 0;
  }
`;
