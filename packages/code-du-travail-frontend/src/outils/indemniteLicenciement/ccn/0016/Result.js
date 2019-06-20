import React from "react";
import MathJax from "react-mathjax-preview";
import { Container, Alert, Button } from "@cdt/ui";
import { getIndemnite, getSalaireRef } from "../../indemnite";
import { branches } from "../../branches";
import { SectionTitle, Highlight, SmallText } from "../../stepStyles";
import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel
} from "./indemnite";

import { ErrorBoundary } from "../../../../common/ErrorBoundary";

export function Result({ form }) {
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
    age,
    categorie,
    tamDuration,
    cadreDuration,
    hasRetirementAge = false
  } = state.values;

  const selectedBranche = branches.find(br => br.value === branche);

  const salaireRef = getSalaireRef({
    hasTempsPartiel,
    hasSameSalaire,
    salaire,
    salairePeriods,
    salaires,
    anciennete,
    primes
  });

  const { indemnite } = getIndemnite({
    salaireRef,
    anciennete,
    inaptitude,
    dateNotification
  });

  const salaireRefConventionnel = getSalaireRefConventionnel({
    hasTempsPartiel,
    hasSameSalaire,
    salaire,
    salairePeriods,
    salaires,
    primes,
    anciennete,
    categorie
  });

  const {
    error,
    indemniteConventionnelle,
    formula
  } = getIndemniteConventionnelle({
    age,
    categorie,
    salaireRef: salaireRefConventionnel,
    indemnite,
    anciennete,
    tamDuration,
    cadreDuration,
    hasRetirementAge
  });

  return (
    <Container>
      <SectionTitle>{selectedBranche.label}</SectionTitle>
      {error ? (
        <Alert>
          Aucune indemnité de licenciement n’est prévue en deça de 2 ans
          d’ancienneté.
        </Alert>
      ) : (
        <IndemniteConventionnelle
          montant={indemniteConventionnelle}
          indemniteLegale={indemnite}
          formula={formula}
        />
      )}
    </Container>
  );
}

function IndemniteConventionnelle({ montant, formula, indemniteLegale }) {
  return (
    <React.Fragment>
      <p>
        Le montant de l’indemnité est <Highlight>{montant} €</Highlight>{" "}
        <SmallText>
          {montant > indemniteLegale
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
      <br />
      <br />
      <Button> Recommencer une simulation </Button>
    </React.Fragment>
  );
}
