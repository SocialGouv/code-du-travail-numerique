import React from "react";
import PropTypes from "prop-types";

import MathJax from "react-mathjax-preview";

import { ErrorBoundary } from "../../../common/ErrorBoundary";

import { SectionTitle, Highlight, Summary } from "../../common/stepStyles";

function IndemniteLegale({ indemniteLegale, formuleLegale }) {
  return (
    <>
      <SectionTitle>Indemnité légale</SectionTitle>
      <p>
        Le code du travail prévoit un montant minimum de{" "}
        <Highlight>{indemniteLegale} €</Highlight> pour votre indemnité de
        licenciement.
      </p>
      <details>
        <Summary>Voir le detail du calcul</Summary>
        <ErrorBoundary>
          <MathJax math={"`" + formuleLegale + "`"} />
        </ErrorBoundary>
      </details>
    </>
  );
}

IndemniteLegale.propTypes = {
  indemniteLegale: PropTypes.number.isRequired,
  formuleLegale: PropTypes.string.isRequired
};

export { IndemniteLegale };
