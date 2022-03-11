import React, { useEffect } from "react";

import {
  mapToPublicodesSituationForIndemniteLicenciement,
  PublicodesIndemniteLicenciementResult,
  usePublicodes,
} from "../../publicodes";
import { IndemniteLegale } from "../components/IndemniteLegale";
import { getSalaireRef } from "../indemnite";

type Props = {
  form: any;
};

export function StepIndemnite({ form }: Props): JSX.Element {
  const publicodesContext =
    usePublicodes<PublicodesIndemniteLicenciementResult>();

  const {
    hasTempsPartiel = false,
    hasSameSalaire = false,
    salairePeriods = [],
    salaires = [],
    primes = [],
    salaire,
    anciennete,
    inaptitude,
    ccn,
  } = form.getState().values;

  useEffect(() => {
    const salaireRef = getSalaireRef({
      anciennete,
      hasSameSalaire,
      hasTempsPartiel,
      primes,
      salaire,
      salairePeriods,
      salaires,
    });
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
      result={publicodesContext.result.value?.toString() ?? "0"}
      unit={publicodesContext.result.unit?.denominators[0] ?? "€"}
    />
  );
}
