import React from "react";

import { IndemniteCCn } from "../../components/IndemniteConventionnelle";
import { getIndemniteFromFinalForm } from "../../indemnite";
import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel,
} from "./indemnite";

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
    hasRetirementAge = false,
  } = state.values;

  const { indemniteLegale, infoCalculLegal } = getIndemniteFromFinalForm(form);

  const salaireRefConventionnel = getSalaireRefConventionnel({
    anciennete,
    categorie,
    hasSameSalaire,
    hasTempsPartiel,
    primes,
    salaire,
    salairePeriods,
    salaires,
  });

  const { error, indemniteConventionnelle, infoCalculConventionnel } =
    getIndemniteConventionnelle({
      age,
      anciennete,
      cadreDuration,
      categorie,
      hasRetirementAge,
      indemnite: indemniteLegale,
      salaireRef: salaireRefConventionnel,
      tamDuration,
    });
  return (
    <IndemniteCCn
      indemniteConventionnelle={indemniteConventionnelle}
      indemniteLegale={indemniteLegale}
      infoCalculLegal={infoCalculLegal}
      infoCalculConventionnel={infoCalculConventionnel}
      branche={branche}
      error={error}
    />
  );
}
