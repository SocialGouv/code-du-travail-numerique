import React from "react";
import PropTypes from "prop-types";
import { Toast } from "@socialgouv/react-ui";
import data from "@cdt/data...preavis-licenciement/data.json";

import { SectionTitle, Highlight } from "../../common/stepStyles";

import {
  filterSituations,
  getSituationsFor,
  recapSituation,
  getRef
} from "../../common/situations.utils";

const { situations: allSituations } = data;

function StepResult({ form }) {
  const { values } = form.getState();
  const { ccn, cdt, seriousMisconduct, disabledWorker, criteria = {} } = values;
  const idcc = ccn ? ccn.convention.num : "0";

  // Situation CDT
  const initialCDTSituations = getSituationsFor(allSituations, {
    idcc: "0"
  });
  const possibleCDTSituations = filterSituations(initialCDTSituations, cdt);

  const [situationCDT] = possibleCDTSituations;
  const {
    criteria: { ancienneté: seniorityCDT, ...situationCDTCriteria },
    duration: durationCDT
  } = situationCDT;

  // Situation CC
  const initialCCSituations = getSituationsFor(allSituations, { idcc });
  const possibleCCSituations = filterSituations(initialCCSituations, criteria);

  const [situationCC] = possibleCCSituations;
  const {
    criteria: { ancienneté: seniorityCC, ...situationCCCriteria },
    duration: durationCC
  } = situationCC || { criteria: {} };
  const refs = [
    {
      ref: "Article L.1234-1 du code du travail",
      refUrl:
        "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901112&cidTexte=LEGITEXT000006072050&dateTexte=20080501"
    },
    { ref: situationCC.ref, refUrl: situationCC.refUrl }
  ];

  let disclaimer =
    "Une durée de préavis de licenciement ou une condition d'ancienneté plus favorable au salarié peut être prévue dans un accord d'entreprise, le contrat de travail ou les usages.";
  if (durationCDT === 0) {
    if (durationCC === 0) {
      disclaimer =
        "La durée de préavis de licenciement peut aussi être prévue dans une convention ou un accord au niveau de l'entreprise, ou à défaut par les usages pratiqués dans la profession.";
    } else {
      disclaimer =
        "La durée de préavis de licenciement peut aussi être prévue dans une convention ou un accord au niveau de l'entreprise.";
    }
  }

  return (
    <>
      <SectionTitle>Durée du préavis</SectionTitle>
      <p>
        À partir des éléments que vous avez saisis, la durée du préavis de
        licenciement est estimée à&nbsp;:
      </p>
      <p>
        <Highlight>
          {getResult({
            durationCDT,
            durationCC,
            disabledWorker
          })}
        </Highlight>
      </p>
      <Toast>{disclaimer}</Toast>
      <SectionTitle>Détails</SectionTitle>
      <p>
        Il s’agit de la durée la plus longue entre la durée légale prévue par le
        Code du travail et la durée conventionnelle prévue par la convention
        collective:
      </p>
      <ul>
        <li>
          Durée légale: <strong>{situationCDT.answer}</strong>
        </li>
        {situationCC && (
          <li>
            Durée conventionnelle: <strong>{situationCC.answer}</strong>
          </li>
        )}
      </ul>
      <p>Éléments saisis&nbsp;:</p>
      {recapSituation({
        "Licenciement pour faute grave": seriousMisconduct ? "Oui" : "Non",
        "Reconnu en tant que travailleur handicapé": disabledWorker
          ? "Oui"
          : "Non",
        "Ancienneté selon le code du travail": seniorityCDT,
        ...situationCDTCriteria
      })}
      {situationCC && (
        <>
          {recapSituation({
            ...situationCCCriteria,
            ...(seniorityCC && {
              "Ancienneté selon la convention collective": seniorityCC
            }),
            "Convention collective": ccn.convention.title
          })}
          <SectionTitle>Source</SectionTitle>
          {situationCC.ref && situationCC.refUrl && getRef(refs)}
        </>
      )}
    </>
  );
}

StepResult.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};

export { StepResult };

export function getResult({
  durationCDT = 0,
  durationCC = 0,
  disabledWorker = true
}) {
  const durationMax = Math.max(durationCDT, durationCC);
  const durationHandicappedMax = 90;
  let durationHandicapped = 1;
  if (durationMax < durationHandicappedMax) {
    durationHandicapped = Math.min(durationHandicappedMax / durationMax, 2);
  }

  const result = disabledWorker
    ? durationMax * durationHandicapped
    : durationMax;
  const resultFormat =
    result >= 30
      ? `${result / 30} mois`
      : `${result} jour${result > 1 ? "s" : ""}`;
  return resultFormat;
}
