import React from "react";
import PropTypes from "prop-types";
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
  const idcc = ccn ? ccn.num : "0000";

  // Situation CDT
  const initialCDTSituations = getSituationsFor(allSituations, {
    idcc: "0000"
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
      <p>Éléments saisis :</p>
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
            "Ancienneté selon la convention collective": seniorityCC,
            "Convention collective": ccn.title
          })}
          <SectionTitle>Source</SectionTitle>
          {situationCC.ref && situationCC.refUrl && getRef(situationCC)}
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

function getResult({ durationCDT, durationCC, disabledWorker = true }) {
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
