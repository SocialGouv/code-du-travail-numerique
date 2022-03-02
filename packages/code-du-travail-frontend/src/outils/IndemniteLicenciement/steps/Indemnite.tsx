import PropTypes from "prop-types";
import React, { useEffect } from "react";

import {
  mapToPublicodesSituationForIndemniteLicenciement,
  PublicodesIndemniteLicenciementResult,
  usePublicodes,
} from "../../publicodes";
import { IndemniteLegale } from "../components/IndemniteLegale";
import LegalResultIndemnite from "../components/LegalResultIndemnite";
import { getSalaireRef } from "../indemnite";

function StepIndemnite({ form }) {
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
  }, []);

  return (
    <>
      <IndemniteLegale
        result={publicodesContext.result.value?.toString() ?? "0"}
        unit={publicodesContext.result.unit?.denominators[0] ?? "€"}
      />
      <LegalResultIndemnite />
    </>
  );
}

StepIndemnite.propTypes = {
  form: PropTypes.object.isRequired,
};
export { StepIndemnite };
