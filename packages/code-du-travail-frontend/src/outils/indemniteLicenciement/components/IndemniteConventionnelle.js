import React from "react";
import MathJax from "react-mathjax-preview";
import { Alert, Button, Container } from "@cdt/ui";

import { branches } from "../branches";
import { SectionTitle, Highlight, SmallText } from "../stepStyles";
import { ErrorBoundary } from "../../../common/ErrorBoundary";

function IndemniteCCn({
  branche,
  montant,
  indemniteLegale,
  formule,
  formuleLegale,
  error
}) {
  const selectedBranche = branches.find(br => br.value === branche);

  return (
    <Container>
      <SectionTitle>{selectedBranche.label}</SectionTitle>
      {error ? (
        <Alert>{error}</Alert>
      ) : (
        <React.Fragment>
          <p>
            Le montant de l’indemnité est{" "}
            <Highlight>{Math.max(indemniteLegale, montant)} €</Highlight>{" "}
            <SmallText>
              {montant > indemniteLegale
                ? "sur la base du calcul de l’indemnité conventionelle"
                : "sur la base du calcul de l’indemnité légale"}
            </SmallText>
          </p>
          <br />
          <details>
            <summary>Voir le detail du calcul</summary>
            <ErrorBoundary>
              <MathJax
                math={
                  "`" +
                  (montant > indemniteLegale ? formule : formuleLegale) +
                  "`"
                }
              />
            </ErrorBoundary>
          </details>
        </React.Fragment>
      )}
      <br />
      <br />
      <Button>Recommencer une simulation</Button>
    </Container>
  );
}

export { IndemniteCCn };
