import React from "react";
import MathJax from "react-mathjax-preview";
import { Alert, Button } from "@cdt/ui";

import { branches } from "../branches";
import { SectionTitle, Highlight, SmallText, Summary } from "../stepStyles";
import { ErrorBoundary } from "../../../common/ErrorBoundary";

function IndemniteCCn({
  branche,
  indemniteConventionnelle,
  indemniteLegale,
  formuleConventionnelle,
  formuleLegale,
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
            L’indemnité conventionnelle est de {indemniteConventionnelle}
            <br />
            L’indemnité légale est de {indemniteLegale}
            <br />
            Le montant de l’indemnité est de{" "}
            <Highlight>
              {Math.max(indemniteLegale, indemniteConventionnelle)} €
            </Highlight>{" "}
            <SmallText>
              {indemniteConventionnelle > indemniteLegale
                ? "sur la base du calcul de l'indemnité conventionelle"
                : "sur la base du calcul de l’indemnité légale"}
            </SmallText>
          </p>
          <br />
          <details>
            <Summary>Voir le detail du calcul</Summary>
            <ErrorBoundary>
              <MathJax
                math={
                  "`" +
                  (indemniteConventionnelle > indemniteLegale
                    ? formuleConventionnelle
                    : formuleLegale) +
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
    </>
  );
}

export { IndemniteCCn };
