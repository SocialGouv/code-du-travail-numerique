import React from "react";

import { IndemniteCCn } from "../../components/IndemniteConventionnelle";
import { getIndemniteFromFinalForm } from "../../indemnite";
import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel,
} from "./indemnite";

function ResultProprete({ form }) {
  const state = form.getState();

  const {
    salaires = [],
    salaire,
    anciennete,
    dateNotification,
    isEco,
    hasOpe,
    age,
    groupe,
    branche,
  } = state.values;

  const { salaireRefLegal, indemniteLegale, infoCalculLegal } =
    getIndemniteFromFinalForm(form);

  const salaireRef = getSalaireRefConventionnel({
    dateNotification,
    groupe,
    salaire,
    salaireRefLegal,
    salaires,
  });

  const { indemniteConventionnelle, infoCalculConventionnel, error } =
    getIndemniteConventionnelle({
      age,
      anciennete,
      groupe,
      hasOpe,
      indemnite: indemniteLegale,
      isEco,
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

export default ResultProprete;
