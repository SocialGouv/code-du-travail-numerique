import React from "react";

import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel
} from "./indemnite";

import { getIndemniteFromFinalForm } from "../../indemnite";
import { IndemniteCCn } from "../../components/IndemniteConventionnelle";

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
    branche
  } = state.values;

  const {
    salaireRefLegal,
    indemniteLegale,
    formuleLegale
  } = getIndemniteFromFinalForm(form);

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
    indemnite: indemniteLegale,
    anciennete,
    isEco,
    hasOpe,
    age,
    groupe
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

export default ResultProprete;
