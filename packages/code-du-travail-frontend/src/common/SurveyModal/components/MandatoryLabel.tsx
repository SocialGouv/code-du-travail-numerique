import React from "react";
import styled from "styled-components";

export const MandatoryLabel = (): JSX.Element => (
  <p>
    <Mandatory>*</Mandatory> Champs obligatoires
  </p>
);

const Mandatory = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;
