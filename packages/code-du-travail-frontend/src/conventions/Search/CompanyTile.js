import { theme } from "@socialgouv/cdtn-react-ui";
import React from "react";
import styled from "styled-components";

import { ConventionLink } from "./ConventionLink";

export const CompanyTile = ({ conventions = [], label, onClick }) => (
  <>
    <Entreprise>{label}</Entreprise>
    {conventions.length ? (
      conventions.map((convention) => (
        <ConventionLink
          convention={convention}
          small
          key={convention.num}
          onClick={onClick}
        />
      ))
    ) : (
      <Div>Aucune convention collective connue pour cette entreprise</Div>
    )}
  </>
);

const { spacings } = theme;

const Entreprise = styled.div`
  margin: ${spacings.xsmall} 0 0 0;
  font-weight: bold;
`;

const Div = styled.div`
  margin-bottom: ${spacings.xsmall};
`;
