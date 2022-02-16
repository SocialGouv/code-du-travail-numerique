import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { HighlightResult, SectionTitle } from "../../common/stepStyles";
import {
  mapToPublicodesSituationForPreavisDeLicenciement,
  usePublicodes,
} from "../../publicodes";
import { getSalaireRef } from "../indemnite";

function IndemniteLegale(formValues) {
  const publicodesContext = usePublicodes();

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
