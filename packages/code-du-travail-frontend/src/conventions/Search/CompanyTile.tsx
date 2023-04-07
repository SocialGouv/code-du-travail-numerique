import { theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { ConventionLink } from "./ConventionLink";
import { Agreement } from "./api/type";

type Props = {
  conventions: Agreement[];
  label: string;
  onClick: (agreement: Agreement) => void;
};

export const CompanyTile = ({
  conventions = [],
  label,
  onClick,
}: Props): JSX.Element => (
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
