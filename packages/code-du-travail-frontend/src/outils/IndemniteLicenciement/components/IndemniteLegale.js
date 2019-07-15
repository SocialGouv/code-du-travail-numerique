import React from "react";
import PropTypes from "prop-types";

import { FormulaDetails } from "./FormulaDetails";
import { SectionTitle, Highlight } from "../../common/stepStyles";

function IndemniteLegale({ indemniteLegale, formuleLegale, inputLegals }) {
  return (
    <>
      <SectionTitle>Indemnité légale</SectionTitle>
      <p>
        Le code du travail prévoit un montant minimum de{" "}
        <Highlight>{indemniteLegale} €</Highlight> pour votre indemnité de
        licenciement.
      </p>
      <FormulaDetails formula={formuleLegale} values={inputLegals} />
    </>
  );
}

IndemniteLegale.propTypes = {
  indemniteLegale: PropTypes.number.isRequired,
  formuleLegale: PropTypes.string.isRequired
};

export { IndemniteLegale };
