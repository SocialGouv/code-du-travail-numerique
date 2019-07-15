import React from "react";
import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel
} from "./indemnite";
import { getIndemniteFromFinalForm } from "../../indemnite";
import { IndemniteCCn } from "../../components/IndemniteConventionnelle";

function Result({ form }) {
  const state = form.getState();

  const {
    salaires,
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
    formuleLegale,
    inputLegals
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
    formuleConventionnelle,
    inputConventionnels
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
      indemniteConventionnelle={indemniteConventionnelle}
      indemniteLegale={indemniteLegale}
      formuleConventionnelle={formuleConventionnelle}
      formuleLegale={formuleLegale}
      branche={branche}
      inputLegals={inputLegals}
      inputConventionnels={inputConventionnels}
    />
  );
}

export { Result };
