import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Alert, Toast, Button, theme } from "@socialgouv/react-ui";

import { branches } from "../branches";
import { SectionTitle, Highlight } from "../../common/stepStyles";
import { Montant } from "./Montant";
import { FormulaDetails } from "./FormulaDetails";

function IndemniteCCn({
  branche,
  children,
  indemniteConventionnelle,
  indemniteLegale,
  infoCalculLegal,
  infoCalculConventionnel,
  error
}) {
  const selectedBranche = branches.find(br => br.value === branche);

  const isIndemniteConventionnelleBigger =
    indemniteConventionnelle > indemniteLegale;

  return (
    <>
      <SectionTitle>{selectedBranche.label}</SectionTitle>
      {error ? (
        <Alert>{error}</Alert>
      ) : (
        <>
          <p>
            À partir des éléments que vous avez saisis, votre indémnité de
            licenciement est estimée à{" "}
            <Highlight>
              {Math.max(
                indemniteLegale,
                indemniteConventionnelle
              ).toLocaleString("fr-FR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })}
              &nbsp;€ brut
            </Highlight>
          </p>
          <p>
            Il s’agit du montant le plus favorable entre votre indemnité légale
            et votre indemnité conventionnelle.
          </p>
          <RowWrapper>
            <Row first={!isIndemniteConventionnelleBigger}>
              <Heading>Votre indemnite légale</Heading>
              <Montant
                primary={!isIndemniteConventionnelleBigger}
                value={indemniteLegale}
                ratio={
                  isIndemniteConventionnelleBigger
                    ? indemniteLegale / indemniteConventionnelle
                    : 1
                }
              />
              <FormulaDetails infoCalcul={infoCalculLegal} />
            </Row>
            <Row first={isIndemniteConventionnelleBigger}>
              <Heading>Votre indemnite conventionnelle</Heading>
              <Montant
                primary={isIndemniteConventionnelleBigger}
                value={indemniteConventionnelle}
                ratio={
                  isIndemniteConventionnelleBigger
                    ? 1
                    : indemniteConventionnelle / indemniteLegale
                }
              />
              <FormulaDetails infoCalcul={infoCalculConventionnel} />
            </Row>
          </RowWrapper>
          {children}
        </>
      )}
      <StyledToast variant="info">
        Un accord collectif d’entreprise, le contrat de travail et un usage
        peuvent prévoir une formule de calcul plus avantageuse pour le salarié.
        Dans ce cas, le salarié perçoit l’indemnité la plus élevée.
      </StyledToast>
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

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.section`
  padding: 0 ${spacing.small};
  order: ${({ first }) => (first ? 0 : 1)};
`;

const Heading = styled.h2`
  font-size: ${fonts.sizeH4};
`;

const StyledToast = styled(Toast)`
  margin: ${spacing.interComponent} 0;
`;
