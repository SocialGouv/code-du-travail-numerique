import React from "react";
import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel
} from "./0044_indemnite";
import { getIndemniteFromFinalForm } from "../../indemnite";
import { IndemniteCCn } from "../../components/IndemniteConventionnelle";

function Result_Chimie({ form }) {
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
    formuleLegale
  } = getIndemniteFromFinalForm(form);

  const salaireRef = getSalaireRefConventionnel({
    salaireRefLegal,
    groupe,
    salaires,
    salaire,
    dateNotification
  });
  const { indemniteConventionnelle, formula } = getIndemniteConventionnelle({
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
    />
  );
}

export default Result_Chimie;
