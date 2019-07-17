import React from "react";
import { getIndemniteFromFinalForm } from "../../indemnite";

import { IndemniteCCn } from "../../components/IndemniteConventionnelle";
import { getIndemnite, getSalaireRef } from "./indemnite";

export function Result({ form }) {
  const state = form.getState();

  const {
    hasTempsPartiel = false,
    hasSameSalaire = false,
    salairePeriods = [],
    salaires = [],
    salaire,
    anciennete,
    dateEntree,
    dateSortie,
    branche,
    motif,
    categorie
  } = state.values;

  const { indemniteLegale, infoCalculLegal } = getIndemniteFromFinalForm(form);
  const salaireRef = getSalaireRef({
    hasTempsPartiel,
    hasSameSalaire,
    salaire,
    salairePeriods,
    salaires,
    anciennete
  });
  const {
    error,
    indemniteConventionnelle,
    infoCalculConventionnel
  } = getIndemnite({
    salaireRef,
    dateEntree,
    dateSortie,
    anciennete,
    categorie,
    motif
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
