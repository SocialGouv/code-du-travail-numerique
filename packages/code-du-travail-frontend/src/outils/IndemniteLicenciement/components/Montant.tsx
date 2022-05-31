import { theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

type Props = {
  value: number;
  ratio: number;
};

export default function Montant({ value, ratio = 1 }: Props) {
  return (
    <Wrapper>
      <Bar ratio={ratio} />
      <Value>
        {value.toLocaleString("fr-FR", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}
        &nbsp;€ brut
      </Value>
    </Wrapper>
  );
}

const { box, breakpoints, fonts, spacings } = theme;

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  @media (max-width: ${breakpoints.tablet}) {
    flex-flow: wrap;
  }
`;

const Bar = styled.div`
  width: ${({ ratio }) => `calc(50% * ${ratio})`};
  background-color: ${({ theme }) => theme.secondary};
  border-radius: ${box.borderRadius};
  @media (max-width: ${breakpoints.tablet}) {
    width: ${({ ratio }) => `calc(100% * ${ratio})`};
  }
`;
const Value = styled.span`
  margin-left: ${spacings.base};
  color: ${({ theme }) => theme.altText};
  font-size: ${fonts.sizes.headings.small};
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    margin-left: 0;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
