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

  const { indemniteLegale, infosCalculLegal } = getIndemniteFromFinalForm(form);

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
    infosCalculConventionnel
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
      indemniteConventionnelle={indemniteConventionnelle}
      indemniteLegale={indemniteLegale}
      infosCalculLegal={infosCalculLegal}
      infosCalculConventionnel={infosCalculConventionnel}
      branche={branche}
      error={error}
    />
  );
}
