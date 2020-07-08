import React from "react";

import { IndemniteCCn } from "../../components/IndemniteConventionnelle";
import { getIndemniteFromFinalForm } from "../../indemnite";
import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel,
} from "./indemnite";

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
    branche,
  } = state.values;

  const {
    salaireRefLegal,
    indemniteLegale,
    infoCalculLegal,
  } = getIndemniteFromFinalForm(form);

  const salaireRef = getSalaireRefConventionnel({
    dateNotification,
    groupe,
    salaire,
    salaireRefLegal,
    salaires,
  });
  const {
    indemniteConventionnelle,
    infoCalculConventionnel,
  } = getIndemniteConventionnelle({
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
    />
  );
}

export { Result };
