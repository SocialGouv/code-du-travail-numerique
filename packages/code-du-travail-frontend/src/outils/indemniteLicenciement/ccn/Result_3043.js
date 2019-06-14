import React from "react";
import MathJax from "react-mathjax-preview";
import { ErrorBoundary } from "../../../common/ErrorBoundary";
import { Container, Button } from "@cdt/ui";
import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel
} from "./3043_indemnite";

import { branches } from "../branches";
import { getIndemnite, getSalaireRef } from "../indemnite";
import { SectionTitle, Highlight, SmallText } from "../stepStyles";

function ResultProprete({ form }) {
  const state = form.getState();

  const {
    hasTempsPartiel = false,
    hasSameSalaire = false,
    inaptitude = false,
    salairePeriods = [],
    salaires = [],
    primes = [],
    salaire,
    anciennete,
    dateNotification,
    branche,
    isEco,
    hasOpe,
    age,
    groupe
  } = state.values;

  const selectedBranche = branches.find(br => br.value === branche);

  const salaireRefLegal = getSalaireRef({
    hasTempsPartiel,
    hasSameSalaire,
    salaire,
    salairePeriods,
    salaires,
    anciennete,
    primes
  });

  const { indemnite } = getIndemnite({
    salaireRef: salaireRefLegal,
    anciennete,
    inaptitude,
    dateNotification
  });

  const salaireRef = getSalaireRefConventionnel({
    salaireRefLegal,
    groupe,
    salaires,
    salaire,
    dateNotification
  });
  const {
    indemniteConventionnelle,
    formula,
    error
  } = getIndemniteConventionnelle({
    salaireRef,
    indemnite,
    anciennete,
    isEco,
    hasOpe,
    age,
    groupe
  });

  return (
    <Container>
      <SectionTitle>{selectedBranche.label}</SectionTitle>
      {error ? (
        <p>{error}</p>
      ) : (
        <React.Fragment>
          <p>
            Le montant de l’indemnité est{" "}
            <Highlight>{indemniteConventionnelle} €</Highlight>{" "}
            <SmallText>
              {indemniteConventionnelle > indemnite
                ? "sur la base du calcul de l'indemnité conventionelle"
                : "sur la base du calcul de l’indemnité légale"}
            </SmallText>
          </p>
          <br />
          <details>
            <summary>Voir le detail du calcul</summary>
            <ErrorBoundary>
              <MathJax math={"`" + formula + "`"} />
            </ErrorBoundary>
          </details>
        </React.Fragment>
      )}
      <br />
      <br />
      <Button> Recommencer une simulation </Button>
    </Container>
  );
}

export default ResultProprete;
