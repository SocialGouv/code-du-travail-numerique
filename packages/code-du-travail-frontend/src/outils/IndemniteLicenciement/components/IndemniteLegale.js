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
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })}
          &nbsp;€&nbsp;brut.
        </Highlight>{" "}
      </p>
      <FormulaDetails infoCalcul={infoCalcul} />
      <p>
        Source&nbsp;:{" "}
        <a
          rel="nofollow noopener"
          href="https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=A95D336F1F70D58757C202BA1D670CF4.tplgfr31s_1?idArticle=LEGIARTI000035644154&cidTexte=LEGITEXT000006072050&dateTexte=20170924"
          title="voir l'article L.1234-9 du code du travail sur légifrance"
        >
          Article L.1234-9 du code du travail
        </a>
        ,
        <a
          rel="nofollow noopener"
          href="https://www.legifrance.gouv.fr/affichCode.do;jsessionid=A95D336F1F70D58757C202BA1D670CF4.tplgfr31s_1?idSectionTA=LEGISCTA000018537572&cidTexte=LEGITEXT000006072050&dateTexte=20170927"
          title="voir les articles R1234-1 à R1234-4 du code du travail sur légifrance"
        >
          Article R1234-1 à R1234-4 du code du travail
        </a>
      </p>
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
