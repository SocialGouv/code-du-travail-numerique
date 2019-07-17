import React from "react";
import PropTypes from "prop-types";

import { FormulaDetails } from "./FormulaDetails";
import { SectionTitle, Highlight } from "../../common/stepStyles";

function IndemniteLegale({ indemnite, infoCalcul }) {
  return (
    <>
      <SectionTitle>Indemnité légale</SectionTitle>
      <p>
        Le code du travail prévoit un montant minimum de{" "}
        <Highlight>
          {indemnite.toLocaleString("fr-FR", {
            currency: "EUR",
            style: "currency",
            minimumFractionDigits: 2
          })}
        </Highlight>{" "}
        pour votre indemnité de licenciement.
      </p>
      <FormulaDetails infoCalcul={infoCalcul} />
    </>
  );
}

IndemniteLegale.propTypes = {
  indemnite: PropTypes.number.isRequired,
  infoCalcul: PropTypes.shape({
    formula: PropTypes.string.isRequired,
    labels: PropTypes.object.isRequired
  }).isRequired
};

export { IndemniteLegale };
