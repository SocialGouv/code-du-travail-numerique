import React, { useEffect } from "react";

import { HighlightResult, SectionTitle } from "../../common/stepStyles";
import {
  mapToPublicodesSituationForIndemniteLicenciement,
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
    dateEntree,
    dateSortie,
    totalAbsence,
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
    console.log(
      formValues.formValues.ccn,
      dateEntree,
      dateSortie,
      salaireRef,
      totalAbsence
    );
    publicodesContext.setSituation(
      mapToPublicodesSituationForIndemniteLicenciement(
        formValues.formValues.ccn,
        dateEntree,
        dateSortie,
        salaireRef,
        totalAbsence
      )
    );
    publicodesContext.execute("contrat salarié . indemnité de licenciement");
  }, [formValues]);

  const notifications = publicodesContext.getNotifications();
  console.log(publicodesContext);
  return (
    <>
      <SectionTitle>Indemnité légale</SectionTitle>
      <p>
        Le code du travail prévoit un montant minimum de&nbsp;:{" "}
        <HighlightResult>
          {publicodesContext.result.nodeValue}&nbsp;
          {publicodesContext.result.unit?.numerators[0]}&nbsp;brut.
        </HighlightResult>{" "}
      </p>
      {notifications}
      {/*<FormulaDetails infoCalcul={infoCalcul} withSource />*/}
    </>
  );
}

// IndemniteLegale.propTypes = {
//   indemnite: PropTypes.number.isRequired,
//   infoCalcul: PropTypes.shape({
//     formula: PropTypes.string.isRequired,
//     labels: PropTypes.object.isRequired,
//   }).isRequired,
// };

export { IndemniteLegale };
