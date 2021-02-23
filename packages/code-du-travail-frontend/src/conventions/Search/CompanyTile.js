import { theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { ConventionLink } from "./ConventionLink";
import { ADRESSE_SEARCH, ENTERPRISE_SEARCH_NO_CC } from "./searchHook";

export const CompanyTile = ({
  conventions = [],
  simpleLabel,
  label,
  ville,
  onClick,
  searchType,
}) => (
  <>
    <Entreprise>{simpleLabel}</Entreprise>
    <Ville>
      <div dangerouslySetInnerHTML={{ __html: label }} />
    </Ville>
    {ville && [ADRESSE_SEARCH, ENTERPRISE_SEARCH_NO_CC].includes(searchType) ? (
      <Ville>{ville}</Ville>
    ) : (
      ""
    )}

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

const Ville = styled.div`
  margin: ${spacings.xsmall} 0 0 0;
`;

const Entreprise = styled.div`
  margin: ${spacings.xsmall} 0 0 0;
  font-weight: bold;
`;

const Div = styled.div`
  margin-bottom: ${spacings.xsmall};
`;
