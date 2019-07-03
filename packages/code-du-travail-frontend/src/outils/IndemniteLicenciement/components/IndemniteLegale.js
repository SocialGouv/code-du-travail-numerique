import React from "react";
import PropTypes from "prop-types";

import MathJax from "react-mathjax-preview";

import { ErrorBoundary } from "../../../common/ErrorBoundary";

import { SectionTitle, Highlight } from "../stepStyles";

function IndemniteLegale({ indemnite, formula }) {
  return (
    <React.Fragment>
      <SectionTitle>Indemnité légale</SectionTitle>
      <p>
        Le code du travail prévoit un montant minimum de{" "}
        <Highlight>{indemnite} €</Highlight> pour votre indemnité de
        licenciement.
      </p>
      <br />
      <details>
        <summary>Voir le detail du calcul</summary>
        <ErrorBoundary>
          <MathJax math={"`" + formula + "`"} />
        </ErrorBoundary>
      </details>
    </React.Fragment>
  );
}

IndemniteLegale.propTypes = {
  indemnite: PropTypes.number.isRequired,
  formula: PropTypes.string.isRequired
};

export { IndemniteLegale };
