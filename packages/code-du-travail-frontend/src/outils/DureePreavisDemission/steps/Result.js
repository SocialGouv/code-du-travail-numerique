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

  // No ccn selected or UunhandledCC
  if (idcc === 0 || possibleSituations.length === 0) {
    let result =
      "Aucun résultat : la convention collective n'a pas encore été traitée par nos services";
    if (idcc === 0) {
      result =
        "Aucun résultat : la convention collective n'a pas été renseignée.";
    }
    return (
      <>
        <SectionTitle>Durée du préavis</SectionTitle>
        <Highlight>{result}</Highlight>
        <p>
          Le code du travail ne prévoit pas de durée de préavis de démission
          sauf, cas particuliers. Nous vous invitons donc à consulter le contenu
          de la convention collective.
        </p>
        <Toast>
          <p>
            Un accord collectif d’entreprise peut également prévoir une durée de
            préavis de démission différente de celle de la convention
            collective, qu’elle soit inférieure ou supérieure. Dans ce cas, la
            durée de préavis de démission prévu par l’accord d’entreprise doit
            s’appliquer.
          </p>
          <p>
            Dans tous les cas, le contrat de travail peut toujours prévoir une
            durée de préavis de démission plus courte que la convention
            collective, l’accord collectif ou un usage. Il faudra alors
            l’appliquer en priorité.
          </p>
        </Toast>
        <SectionTitle>Source</SectionTitle>
        {getRef([refLegal])}
      </>
    );
  }
  // CCn Selected
  const [situation] = possibleSituations;
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
        Une durée de préavis de démission plus favorable au salarié peut aussi
        être prévue dans une convention ou un accord au niveau de l’entreprise
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

StepResult.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};

export { StepResult };
