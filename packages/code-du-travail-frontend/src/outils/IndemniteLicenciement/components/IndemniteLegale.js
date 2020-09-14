import PropTypes from "prop-types";
import React from "react";

import { Highlight, SectionTitle } from "../../common/stepStyles";
import { FormulaDetails } from "./FormulaDetails";

function IndemniteLegale({ indemnite, infoCalcul }) {
  return (
    <>
      <SectionTitle>Indemnité légale</SectionTitle>
      <p>
        Le code du travail prévoit un montant minimum de{" "}
        <Highlight>
          {indemnite.toLocaleString("fr-FR", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
          &nbsp;€&nbsp;brut.
        </Highlight>{" "}
      </p>
      <FormulaDetails infoCalcul={infoCalcul} />
      <p>
        Source&nbsp;:{" "}
        <a
          rel="nofollow noopener noreferrer"
          href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901112&cidTexte=LEGITEXT000006072050&dateTexte=20080501"
          title="voir l'article L.1234-1 du code du travial sur légifrance"
        >
          Article L.1234-1 du code du travail
        </a>
      </p>
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
