import React from "react";
import { theme } from "@cdt/ui";
import styled from "styled-components";

function Montant({ value, primary }) {
  return (
    <Wrapper>
      <Bar primary={primary} />
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

const { box, colors, fonts, spacing } = theme;

const Wrapper = styled.div`
  display: flex;
`;

const Bar = styled.div`
  border-radius: ${box.borderRadius};
  background-color: ${({ primary }) =>
    primary ? colors.blue : colors.darkerGrey};
  width: 50%;
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 1em;
`;
const Value = styled.span`
  margin-left: ${spacing.base};
  color: ${({ primary }) => (primary ? colors.blue : colors.darkerGrey)};
  font-size: ${({ primary }) => (primary ? fonts.sizeH2 : fonts.sizeH4)};
`;
