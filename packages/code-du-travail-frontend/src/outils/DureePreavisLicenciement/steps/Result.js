import data from "@cdt/data...simulateurs/preavis-licenciement.data.json";
import { Accordion } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";

import Disclaimer from "../../common/Disclaimer";
import { isNotNearZero } from "../../common/math";
import {
  filterSituations,
  getRef,
  getSituationsFor,
  recapSituation,
} from "../../common/situations.utils";
import { HighlightResult, SectionTitle } from "../../common/stepStyles";
import DisclaimerText from "./DisclaimerText";

const { situations: allSituations } = data;

function DurationResult({ duration, durationCC, durationCDT }) {
  if (parseInt(durationCDT, 10) === 0) {
    if (durationCC === undefined) {
      return (
        <>
          <HighlightResult>{duration}</HighlightResult>
          <p>
            Le code du travail ne prévoit pas de durée de préavis de
            licenciement sauf, cas particuliers.
          </p>
        </>
      );
    } else if (parseInt(durationCC, 10) === 0) {
      return (
        <>
          <HighlightResult>{duration}</HighlightResult>
          <p>
            Le code du travail et la convention collective ne prévoient pas de
            préavis.
          </p>
        </>
      );
    }
  }
  return (
    <p>
      À partir des éléments que vous avez saisis, la durée du préavis de
      licenciement est estimée à : <HighlightResult>{duration}</HighlightResult>
      .
    </p>
  );
}

function DisplayResult({
  idcc,
  durationCC,
  durationCDT,
  situationCDT,
  situationCC,
}) {
  return (
    <>
      <SectionTitle>Résultat</SectionTitle>
      {idcc > 0 && (
        <p>
          Il s’agit de la durée la plus longue entre la durée légale prévue par
          le Code du travail et la durée conventionnelle prévue par la
          convention collective&nbsp;:
        </p>
      )}
      <ul>
        <li>
          Durée légale&nbsp;:{" "}
          <strong>
            {isNotNearZero(durationCDT)
              ? situationCDT.answer
              : "Aucun préavis."}
          </strong>
        </li>
        <li>
          Durée conventionnelle&nbsp;:{" "}
          <strong>
            {situationCC
              ? isNotNearZero(durationCC)
                ? situationCC.answer
                : "Aucun préavis."
              : idcc === 0
              ? "La convention collective n'a pas été renseignée."
              : "La convention collective n'a pas été traitée par nos services."}
          </strong>
        </li>
      </ul>
    </>
  );
}

function StepResult({ form }) {
  const { values } = form.getState();
  const { ccn, cdt, seriousMisconduct, disabledWorker, criteria = {} } = values;
  const idcc = ccn ? ccn.num : 0;

  // Situation CDT
  const initialCDTSituations = getSituationsFor(allSituations, {
    idcc: 0,
  });
  const possibleCDTSituations = filterSituations(initialCDTSituations, cdt);

  const [situationCDT] = possibleCDTSituations;
  const {
    criteria: { ancienneté: seniorityCDT, ...situationCDTCriteria },
    answer3: durationCDT,
  } = situationCDT;

  // Situation CC
  const initialCCSituations =
    idcc > 0 ? getSituationsFor(allSituations, { idcc }) : [];
  const possibleCCSituations = filterSituations(initialCCSituations, criteria);

  const [situationCC] = possibleCCSituations;
  const {
    criteria: { ancienneté: seniorityCC, ...situationCCCriteria },
    answer3: durationCC,
  } = situationCC || { criteria: {} };

  const refs = [
    {
      ref: "Article L.1234-1 du code du travail",
      refUrl:
        "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901112&cidTexte=LEGITEXT000006072050&dateTexte=20080501",
    },
  ];
  if (situationCC) {
    refs.push({ ref: situationCC.ref, refUrl: situationCC.refUrl });
  }

  const duration = getResult({ disabledWorker, durationCC, durationCDT });

  return (
    <>
      <SectionTitle>Durée du préavis</SectionTitle>
      <DurationResult
        duration={duration}
        durationCC={durationCC}
        durationCDT={durationCDT}
      />

      <Accordion
        items={[
          {
            body: (
              <>
                <DisplayResult
                  idcc={idcc}
                  durationCC={durationCC}
                  durationCDT={durationCDT}
                  situationCDT={situationCDT}
                  situationCC={situationCC}
                />
                <SectionTitle>Éléments saisis</SectionTitle>
                {recapSituation({
                  "Ancienneté selon le code du travail": seniorityCDT,
                  "Licenciement pour faute grave": seriousMisconduct
                    ? "Oui"
                    : "Non",
                  "Reconnu en tant que travailleur handicapé": disabledWorker
                    ? "Oui"
                    : "Non",
                  ...situationCDTCriteria,
                  ...(situationCC && {
                    ...situationCCCriteria,
                    ...(seniorityCC && {
                      "Ancienneté selon la convention collective": seniorityCC,
                    }),
                    ...(ccn && { "Convention collective": ccn.title }),
                  }),
                })}
                {situationCC && (
                  <>
                    <SectionTitle>Source</SectionTitle>
                    {situationCC.ref && situationCC.refUrl && getRef(refs)}
                  </>
                )}
              </>
            ),
            title: <p>Voir le détail du calcul</p>,
          },
        ]}
      />
      <Disclaimer title={"Attention il peut exister une durée plus favorable"}>
        <DisclaimerText
          durationCC={durationCC}
          durationCDT={durationCDT}
          ccn={ccn}
        />
      </Disclaimer>
    </>
  );
}

StepResult.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired,
  }),
};

export { StepResult };

export function getResult({
  durationCDT = 0,
  durationCC = 0,
  disabledWorker = true,
}) {
  const durationMax = Math.max(durationCDT, durationCC);
  if (durationMax === 0) {
    return "Aucun préavis";
  }
  const durationHandicappedMax = 90;
  let durationHandicapped = 1;
  if (durationMax < durationHandicappedMax) {
    durationHandicapped = Math.min(durationHandicappedMax / durationMax, 2);
  }

  const result = disabledWorker
    ? durationMax * durationHandicapped
    : durationMax;

  return result >= 30
    ? `${result / 30} mois`
    : `${result} jour${result > 1 ? "s" : ""}`;
}
