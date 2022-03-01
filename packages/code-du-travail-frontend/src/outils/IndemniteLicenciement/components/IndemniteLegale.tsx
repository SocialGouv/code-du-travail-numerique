import { FormApi } from "final-form";
import React, { useEffect } from "react";

import { HighlightResult, SectionTitle } from "../../common/stepStyles";
import {
  mapToPublicodesSituationForIndemniteLicenciement,
  PublicodesIndemniteLicenciementResult,
  usePublicodes,
} from "../../publicodes";
import { getSalaireRef } from "../indemnite";

type Props = {
  form: FormApi<any>;
};

function IndemniteLegale({ form }: Props) {
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
        salaireRef
      )
    );
    publicodesContext.execute("contrat salarié . indemnité de licenciement");
  }, []);

  const notifications = publicodesContext.getNotifications();
  return (
    <>
      <SectionTitle>Indemnité légale</SectionTitle>
      <p>
        Le code du travail prévoit un montant minimum de&nbsp;:{" "}
        <HighlightResult>
          {publicodesContext.result.value}
          &nbsp;€&nbsp;brut.
        </HighlightResult>{" "}
      </p>
      {notifications}
    </>
  );
}

export { IndemniteLegale };
