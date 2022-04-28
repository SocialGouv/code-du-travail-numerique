import React, { useEffect } from "react";

import {
  mapToPublicodesSituationForIndemniteLicenciement,
  PublicodesIndemniteLicenciementResult,
  usePublicodes,
} from "../../publicodes";
import { IndemniteLegale } from "../components/IndemniteLegale";
import { getIndemniteExplications, getSalaireRef } from "../indemnite";

type Props = {
  form: any;
};

export function StepIndemnite({ form }: Props): JSX.Element {
  const publicodesContext =
    usePublicodes<PublicodesIndemniteLicenciementResult>();

  const {
    hasSameSalaire = false,
    salaires = [],
    primes = [],
    salaire,
    anciennete,
    inaptitude,
    ccn,
  } = form.getState().values;
  const salaireRef = getSalaireRef({
    hasSameSalaire,
    primes,
    salaire,
    salaires,
  });
  const infoCalcul = getIndemniteExplications({
    anciennete,
    inaptitude,
    salaireRef,
  });
  useEffect(() => {
    publicodesContext.setSituation(
      mapToPublicodesSituationForIndemniteLicenciement(
        ccn,
        anciennete,
        salaireRef,
        inaptitude
      )
    );
  }, []);

  return (
    <IndemniteLegale
      result={
        publicodesContext.result.value
          ? (Number(publicodesContext.result.value) + 0.004).toLocaleString(
              "fr-FR",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )
          : "0"
      }
      unit={publicodesContext.result.unit?.denominators[0] ?? "€"}
      infoCalcul={infoCalcul}
    />
  );
}
