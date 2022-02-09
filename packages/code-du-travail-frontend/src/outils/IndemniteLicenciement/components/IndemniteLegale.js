import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { usePublicodes } from "../../publicodes";
import { mapToPublicodesSituationForPreavisDeLicenciement } from "../../publicodes/Utils";
import { getSalaireRef } from "../indemnite";
import { HighlightResult, SectionTitle } from "../../common/stepStyles";

function IndemniteLegale(formValues) {
  const publicodesContext = usePublicodes();
  console.log(formValues);
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
      mapToPublicodesSituationForPreavisDeLicenciement(formValues, salaireRef)
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
      {/*<FormulaDetails infoCalcul={infoCalcul} withSource />*/}
    </>
  );
}

IndemniteLegale.propTypes = {
  indemnite: PropTypes.number.isRequired,
  infoCalcul: PropTypes.shape({
    formula: PropTypes.string.isRequired,
    labels: PropTypes.object.isRequired,
  }).isRequired,
};

export { IndemniteLegale };
