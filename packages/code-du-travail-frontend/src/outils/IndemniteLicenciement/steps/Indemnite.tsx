import React, { useEffect } from "react";

import {
  mapToPublicodesSituationForIndemniteLicenciement,
  PublicodesIndemniteLicenciementResult,
  usePublicodes,
} from "../../publicodes";
import { IndemniteLegale } from "../components/IndemniteLegale";
import {
  getIndemniteExplications,
  getSalaireRef,
  getTotalPrimes,
} from "../indemnite";

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
        inaptitude,
        hasSameSalaire,
        getTotalPrimes(primes),
        salaire,
        salaires
      )
    );
  }, []);

  return (
    <IndemniteLegale
      result={publicodesContext.result.value?.toString() ?? "0"}
      unit={publicodesContext.result.unit?.denominators[0] ?? "€"}
      infoCalcul={infoCalcul}
    />
  );
}
