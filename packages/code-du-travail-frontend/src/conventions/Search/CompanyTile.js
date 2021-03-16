import { theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { ConventionLink } from "./ConventionLink";

export const CompanyTile = ({
  conventions = [],
  simpleLabel,
  label,
  highlightLabel,
  activitePrincipale,
  address,
  onClick,
  matching,
}) => (
  <>
    <Entreprise>
      {simpleLabel == label ? (
        <div dangerouslySetInnerHTML={{ __html: highlightLabel }} />
      ) : (
        simpleLabel
      )}
    </Entreprise>

    {simpleLabel != label ? (
      <Ville>
        <div dangerouslySetInnerHTML={{ __html: highlightLabel }} />
      </Ville>
    ) : (
      ""
    )}

    <Ville>{activitePrincipale}</Ville>
    {matching == 1 ? (
      <Ville>{address}</Ville>
    ) : (
      <Ville>
        {matching} établissements avec convention collective trouvés
      </Ville>
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
