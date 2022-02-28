import React, { useEffect } from "react";

import { HighlightResult, SectionTitle } from "../../common/stepStyles";
import {
  mapToPublicodesSituationForIndemniteLicenciement,
  PublicodesIndemniteLicenciementResult,
  usePublicodes,
} from "../../publicodes";
import { getSalaireRef } from "../indemnite";

function IndemniteLegale(formValues) {
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
  } = formValues.formValues;

  const salaireRef = getSalaireRef({
    anciennete,
    hasSameSalaire,
    hasTempsPartiel,
    primes,
    salaire,
    salairePeriods,
    salaires,
  });
  useEffect(() => {
    publicodesContext.setSituation(
      mapToPublicodesSituationForIndemniteLicenciement(
        formValues.formValues.ccn,
        anciennete,
        salaireRef
      )
    );
    publicodesContext.execute("contrat salarié . indemnité de licenciement");
  }, [formValues]);

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
