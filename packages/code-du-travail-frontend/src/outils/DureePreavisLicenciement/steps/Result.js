import React from "react";
import PropTypes from "prop-types";
import data from "@cdt/data...preavis-licenciement/data.json";

import { SectionTitle, Highlight } from "../../common/stepStyles";

import {
  filterSituations,
  getSituationsFor
  // isNotYetProcessed
} from "../../common/situations.utils";
import { recapSituation } from "./situation";

function StepResult({ form }) {
  const { values } = form.getState();
  const { ccn, cdt, fauteGrave, travailleurHandicape, criteria = {} } = values;
  const idcc = ccn ? ccn.num : "0000";

  // Situation CC
  const initialCCSituations = getSituationsFor(data, { idcc });
  const possibleCCSituations = filterSituations(initialCCSituations, criteria);
  const [situationCC] = possibleCCSituations;

  // Situation CDT
  const initialCDTSituations = getSituationsFor(data, { idcc: "0000" });
  const possibleCDTSituations = filterSituations(initialCDTSituations, cdt);
  const [situationCDT] = possibleCDTSituations;

  return (
    <>
      <SectionTitle>Durée du préavis</SectionTitle>
      <p>
        À partir des éléments que vous avez saisis, la durée du préavis de
        licenciement est estimée à&nbsp;:
        <p>
          <Highlight>{situationCC.answer}</Highlight>
        </p>
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
        <li>
          Durée conventionnelle: <strong>{situationCC.answer}</strong>
        </li>
      </ul>
      <p>Éléments saisis :</p>
      <ul>
        <li>
          Licenciement pour faute grave:{" "}
          <strong>{fauteGrave ? "Oui" : "Non"}</strong>
        </li>
        <li>
          Reconnu en tant que travailleur handicapé:{" "}
          <strong>{travailleurHandicape ? "Oui" : "Non"}</strong>
        </li>
        {recapSituation(situationCDT).map(result => (
          <li key={result}>{result}</li>
        ))}
        {recapSituation(situationCC).map(result => (
          <li key={result}>{result}</li>
        ))}
        <li>
          Convention collective: <strong>{ccn.title}</strong>
        </li>
      </ul>
      <SectionTitle>Source</SectionTitle>
      {situationCC.ref && situationCC.refUrl && getRef(situationCC)}
    </>
  );
}

StepResult.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};

export { StepResult };

function getRef({ ref, refUrl }) {
  return (
    <p>
      <a href={refUrl} title={`Consultez l’${ref.toLowerCase()}`}>
        {ref}
      </a>
    </p>
  );
}
