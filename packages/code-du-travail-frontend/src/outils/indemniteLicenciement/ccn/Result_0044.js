import React from "react";
import MathJax from "react-mathjax-preview";
import { ErrorBoundary } from "../../../common/ErrorBoundary";
import { Container, Button } from "@cdt/ui";
import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel
} from "./0044_indemnite";
import { getIndemnite, getSalaireRef } from "../indemnite";

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
    salaireRef,
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
    <Container narrow>
      <h2>Indemnité Conventionnelle</h2>
      {indemniteConventionnelle > indemnite ? (
        <p>
          Le montant de l’indemnité conventionnelle est inférieur à celui de
          l’indemnité légale. <br /> Le montant de votre indémnité de
          licenciement sera de <strong>{indemniteConventionnelle} €</strong>{" "}
          (sur la base de l’indemnité légale)
        </p>
      ) : (
        <p>
          Le montant de l’indemnité conventionnelle est inférieur à l’indemnité
          légale. Le montant de votre indémnité de licenciement est fixé par le
          code du travail est sera de
          <strong>{indemniteConventionnelle} €</strong>
        </p>
      )}
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
