import React from "react";
import PropTypes from "prop-types";
import { theme, Alert, Button, Toast } from "@cdt/ui";
import styled from "styled-components";

import { branches } from "../branches";
import { SectionTitle, Highlight } from "../../common/stepStyles";
import { Montant } from "./Montant";
import { FormulaDetails } from "./FormulaDetails";

function IndemniteCCn({
  branche,
  indemniteConventionnelle,
  indemniteLegale,
  infoCalculLegal,
  infoCalculConventionnel,
  error
}) {
  const selectedBranche = branches.find(br => br.value === branche);

  return (
    <>
      <SectionTitle>{selectedBranche.label}</SectionTitle>
      {error ? (
        <Alert>{error}</Alert>
      ) : (
        <React.Fragment>
          <p>
            À partir des éléments que vous avez saisis, votre indémnité de
            licenciement est estimée à{" "}
            <Highlight>
              {Math.max(
                indemniteLegale,
                indemniteConventionnelle
              ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })}
              &nbsp;€
            </Highlight>{" "}
            <b>brut</b>
          </p>
          <p>
            Il s’agit du montant le plus favorable entre votre indemnité légale
            et votre indemnité conventionnelle.
          </p>
          <ColumnWrapper>
            <Column first={indemniteConventionnelle < indemniteLegale}>
              <Heading>Votre indemnite légale</Heading>
              <Montant
                primary={indemniteConventionnelle < indemniteLegale}
                value={indemniteLegale}
              />
              <FormulaDetails infoCalcul={infoCalculLegal} />
            </Column>
            <Column first={indemniteConventionnelle > indemniteLegale}>
              <Heading>Votre indemnite conventionnelle</Heading>
              <Montant
                primary={indemniteConventionnelle > indemniteLegale}
                value={indemniteConventionnelle}
              />
              <FormulaDetails infoCalcul={infoCalculConventionnel} />
            </Column>
          </ColumnWrapper>

          <Toast variant="info">
            Un accord collectif d’entreprise, le contrat de travail et un usage
            peuvent prévoir une formule de calcul plus avantageuse pour le
            salarié. Dans ce cas, le salarié perçoit l’indemnité la plus élevée.{" "}
          </Toast>
        </React.Fragment>
      )}
      <br />
      <br />
      <Button>Recommencer une simulation</Button>
    </>
  );
}
IndemniteCCn.propTypes = {
  branche: PropTypes.string.isRequired,
  indemniteConventionnelle: PropTypes.number.isRequired,
  indemniteLegale: PropTypes.number.isRequired,
  error: PropTypes.string,
  infoCalculLegal: PropTypes.shape({
    formula: PropTypes.string.isRequired,
    labels: PropTypes.object.isRequired
  }).isRequired,
  infoCalculConventionnel: PropTypes.shape({
    formula: PropTypes.string.isRequired,
    labels: PropTypes.object.isRequired
  }).isRequired
};

export { IndemniteCCn };

const { spacing, fonts } = theme;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${spacing.large} -${spacing.small};
  flex-wrap: wrap;
`;

const Column = styled.section`
  padding: 0 ${spacing.small};
  order: ${({ first }) => (first ? 0 : 1)};
  margin-bottom: ${spacing.large};
`;

const Heading = styled.h2`
  font-size: ${fonts.sizeH4};
`;
