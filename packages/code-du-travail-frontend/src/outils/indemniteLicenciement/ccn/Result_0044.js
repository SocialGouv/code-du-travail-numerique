import React from "react";
import MathJax from "react-mathjax-preview";
import { ErrorBoundary } from "../../../common/ErrorBoundary";
import { Container, Button } from "@cdt/ui";
import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel
} from "./0044_indemnite";
import { getIndemnite, getSalaireRef } from "../indemnite";
import {
  SectionTitle,
  Highlight,
  ResultWrapper,
  SmallText
} from "../stepStyles";

function Result_Chimie({ form }) {
  const state = form.getState();

  const {
    hasTempsPartiel = false,
    hasSameSalaire = false,
    inaptitude = false,
    salairesPeriods = [],
    salaires = [],
    primes = [],
    salaire,
    anciennete,
    dateNotification,
    isEco,
    hasOpe,
    age,
    groupe
  } = state.values;

  const salaireRefLegal = getSalaireRef({
    hasTempsPartiel,
    hasSameSalaire,
    salaire,
    salairesPeriods,
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
  const { indemniteConventionnelle, formula } = getIndemniteConventionnelle({
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
      <SectionTitle>Indemnité Conventionnelle</SectionTitle>
      <p>
        Le montant de l’indemnité est{" "}
        <Highlight>{indemniteConventionnelle} €</Highlight>{" "}
        <SmallText>
          {indemniteConventionnelle > indemnite
            ? "sur la base du calcul d'indemnité conventionel"
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
    </Container>
  );
}

export default Result_Chimie;
