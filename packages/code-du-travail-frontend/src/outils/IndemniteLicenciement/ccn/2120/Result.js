import React from "react";

import { IndemniteCCn } from "../../components/IndemniteConventionnelle";
import { getIndemniteFromFinalForm } from "../../indemnite";
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
    categorie,
  } = state.values;

  const { indemniteLegale, infoCalculLegal } = getIndemniteFromFinalForm(form);
  const salaireRef = getSalaireRef({
    anciennete,
    hasSameSalaire,
    hasTempsPartiel,
    salaire,
    salairePeriods,
    salaires,
  });
  const { error, indemniteConventionnelle, infoCalculConventionnel } =
    getIndemnite({
      anciennete,
      categorie,
      dateEntree,
      dateSortie,
      motif,
      salaireRef,
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
