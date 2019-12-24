import React from "react";
import PropTypes from "prop-types";
import { Toast } from "@socialgouv/react-ui";
import data from "@cdt/data...preavis-demission/data.json";

import { SectionTitle, Highlight } from "../../common/stepStyles";

import {
  filterSituations,
  getSituationsFor,
  recapSituation,
  getRef
} from "../../common/situations.utils";

function StepResult({ form }) {
  const { values } = form.getState();
  const { ccn, criteria = {} } = values;
  const idcc = ccn ? ccn.convention.num : 0;

  const initialSituations = getSituationsFor(data.situations, { idcc });
  const possibleSituations = filterSituations(initialSituations, criteria);
  const refLegal = {
    ref: " Article L.1237-1 du code du travail",
    refUrl:
      "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000006901174"
  };
  switch (possibleSituations.length) {
    case 1: {
      const [situation] = possibleSituations;
      const { idcc } = situation;
      const { title: ccLabel } = ccn.convention;

      return (
        <>
          <SectionTitle>Durée du préavis</SectionTitle>
          <p>
            À partir des éléments que vous avez saisis, la durée du préavis de
            démission est estimée à&nbsp;:
          </p>
          <p>
            <Highlight>{situation.answer}</Highlight>.
          </p>
          <Toast>
            Une durée de préavis de démission plus favorable au salarié peut
            aussi être prévue dans une convention ou un accord au niveau de
            l’entreprise
          </Toast>
          <SectionTitle>Détails</SectionTitle>
          <p>Éléments saisis&nbsp;:</p>
          {recapSituation({
            "Convention collective": `${ccLabel} (${idcc})`,
            ...situation.criteria
          })}
          <SectionTitle>Source</SectionTitle>
          {getRef([refLegal, situation])}
        </>
      );
    }
    default:
      return <>La situation du salarié ne permet de répondre précisement.</>;
  }
}

StepResult.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};

export { StepResult };
