import PropTypes from "prop-types";
import React from "react";

import { HighlightResult, SectionTitle } from "../../common/stepStyles";
import { FormulaDetails } from "./FormulaDetails";

function IndemniteLegale({ indemnite, infoCalcul }) {
  return (
    <>
      <SectionTitle>Indemnité légale</SectionTitle>
      <p>
        Le code du travail prévoit un montant minimum de&nbsp;:{" "}
        <HighlightResult>
          {indemnite.toLocaleString("fr-FR", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
          &nbsp;€&nbsp;brut.
        </HighlightResult>{" "}
      </p>
      <FormulaDetails infoCalcul={infoCalcul} withSource />
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
