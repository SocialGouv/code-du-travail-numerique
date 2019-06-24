import React from "react";
import { getIndemniteFromFinalForm } from "../../indemnite";
import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel
} from "./indemnite";

import { IndemniteCCn } from "../../components/IndemniteConventionnelle";

export function Result({ form }) {
  const state = form.getState();

  const {
    hasTempsPartiel = false,
    hasSameSalaire = false,
    salairePeriods = [],
    salaires = [],
    primes = [],
    salaire,
    anciennete,
    branche,
    age,
    categorie,
    tamDuration,
    cadreDuration,
    hasRetirementAge = false
  } = state.values;

  const { indemniteLegale, formuleLegale } = getIndemniteFromFinalForm(form);

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
    indemnite: indemniteLegale,
    anciennete,
    tamDuration,
    cadreDuration,
    hasRetirementAge
  });

  return (
    <IndemniteCCn
      montant={indemniteConventionnelle}
      indemniteLegale={indemniteLegale}
      formule={formula}
      formuleLegale={formuleLegale}
      branche={branche}
      error={error}
    />
  );
}
