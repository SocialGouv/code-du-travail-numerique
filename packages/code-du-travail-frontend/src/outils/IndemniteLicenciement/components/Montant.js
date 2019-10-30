import React from "react";
import { theme } from "@socialgouv/react-ui";
import styled from "styled-components";

function Montant({ value, ratio = 1 }) {
  return (
    <Wrapper>
      <Bar ratio={ratio} />
      <Value>
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

const { box, breakpoints, fonts, spacing } = theme;

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  @media (max-width: ${breakpoints.tablet}) {
    flex-flow: wrap;
  }
`;

const Bar = styled.div`
  width: ${({ ratio }) => `calc(50% * ${ratio})`};
  background-color: ${({ theme }) => theme.grey4};
  border-radius: ${box.borderRadius};
  @media (max-width: ${breakpoints.tablet}) {
    width: ${({ ratio }) => `calc(100% * ${ratio})`};
  }
`;
const Value = styled.span`
  margin-left: ${spacing.base};
  color: ${({ theme }) => theme.lightText};
  font-size: ${fonts.sizeH5};
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    margin-left: 0;
  }
`;
