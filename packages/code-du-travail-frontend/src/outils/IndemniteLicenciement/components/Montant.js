import React from "react";
import { theme } from "@cdt/ui-old";
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
  border-radius: ${box.borderRadius};
  background-color: ${({ primary }) =>
    primary ? colors.blue : colors.lightText};
  width: ${({ ratio }) => `calc(50% * ${ratio})`};
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 1em;
  @media (max-width: ${breakpoints.tablet}) {
    width: ${({ ratio }) => `calc(100% * ${ratio})`};
  }
`;
const Value = styled.span`
  margin-left: ${spacing.base};
  color: ${({ primary }) => (primary ? colors.blue : colors.lightText)};
  font-size: ${({ primary }) => (primary ? fonts.sizeH2 : fonts.sizeH4)};
  @media (max-width: ${breakpoints.tablet}) {
    margin-left: 0;
    width: 100%;
  }
`;
