import data from "@cdt/data...simulateurs/preavis-licenciement.data.json";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import { Accordion, icons, IconStripe } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

import {
  filterSituations,
  getRef,
  getSituationsFor,
  recapSituation,
} from "../../common/situations.utils";
import { HighlightResult, SectionTitle } from "../../common/stepStyles";
import {
  Warning,
  WarningTitle,
} from "../../DureePreavisRetraite/steps/component/WarningResult";

const { situations: allSituations } = data;

function DisclaimerText({ durationCC, durationCDT, ccn }) {
  if (durationCC === undefined) {
    if (parseInt(durationCDT, 10) === 0) {
      return (
        <>
          <p>
            L’existence et la durée du préavis de licenciement peuvent être
            prévues dans la convention collective, un accord d’entreprise ou à
            défaut par un usage dans l’entreprise.
          </p>
          {ccn && (
            <p>
              Vous pouvez faire une recherche par mots-clés dans{" "}
              <Link href={`/${getRouteBySource(SOURCES.CCN)}/${ccn.slug}`}>
                <a>votre convention collective</a>
              </Link>
            </p>
          )}
        </>
      );
    } else {
      return (
        <>
          <p>
            Une durée de préavis de licenciement ou une condition d’ancienneté
            plus favorable au salarié peut être prévue par une convention
            collective, un accord de branche, un accord d’entreprise ou le
            contrat de travail ou les usages.
          </p>
          {ccn && (
            <p>
              Vous pouvez faire une recherche par mots-clés dans{" "}
              <Link href={`/${getRouteBySource(SOURCES.CCN)}/${ccn.slug}`}>
                <a>votre convention collective</a>
              </Link>
            </p>
          )}
        </>
      );
    }
  } else {
    if (parseInt(durationCDT, 10) > 0) {
      return (
        <p>
          Une durée de préavis de licenciement ou une condition d’ancienneté
          plus favorable au salarié que ce que prévoit le code du travail peut
          être prévue par la loi pour certains cas particuliers, par un accord
          d’entreprise, le contrat de travail ou les usages.
        </p>
      );
    } else if (parseInt(durationCC, 10) > 0) {
      return (
        <p>
          L’existence ou la durée du préavis de licenciement peut aussi être
          prévue dans un accord d’entreprise ou à défaut par un usage dans
          l’entreprise.
        </p>
      );
    } else {
      // both cc and legal === 0
      return (
        <p>
          L’existence ou la durée du préavis de licenciement peut être prévue,
          par la loi pour certains cas particuliers, par un accord d’entreprise
          ou à défaut par un usage dans l’entreprise.
        </p>
      );
    }
  }
}

function Disclaimer({ durationCC, durationCDT, ccn }) {
  return (
    <Warning>
      <IconStripe centered icon={icons.Warning}>
        <WarningTitle>
          Attention il peut exister une durée plus favorable
        </WarningTitle>
      </IconStripe>

      <DisclaimerText
        durationCC={durationCC}
        durationCDT={durationCDT}
        ccn={ccn}
      />
    </Warning>
  );
}

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
                <SectionTitle>Résultat</SectionTitle>
                {idcc > 0 && (
                  <p>
                    Il s’agit de la durée la plus longue entre la durée légale
                    prévue par le Code du travail et la durée conventionnelle
                    prévue par la convention collective:
                  </p>
                )}
                <ul>
                  <li>
                    Durée légale:{" "}
                    {parseInt(durationCDT, 10) > 0 ? (
                      <strong>{situationCDT.answer}</strong>
                    ) : (
                      "Aucun préavis."
                    )}
                  </li>
                  <li>
                    Durée conventionnelle:{" "}
                    {situationCC ? (
                      parseInt(durationCC, 10) > 0 ? (
                        <strong>{situationCC.answer}</strong>
                      ) : (
                        "Aucun préavis."
                      )
                    ) : idcc === 0 ? (
                      "La convention collective n'a pas été renseignée."
                    ) : (
                      "La convention collective n'a pas été traitée par nos services."
                    )}
                  </li>
                </ul>
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
                })}
                {situationCC && (
                  <>
                    {recapSituation({
                      ...situationCCCriteria,
                      ...(seniorityCC && {
                        "Ancienneté selon la convention collective":
                          seniorityCC,
                      }),
                      ...(ccn && { "Convention collective": ccn.title }),
                    })}
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
      <Disclaimer durationCC={durationCC} durationCDT={durationCDT} ccn={ccn} />
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

  const resultFormat =
    result >= 30
      ? `${result / 30} mois`
      : `${result} jour${result > 1 ? "s" : ""}`;
  return resultFormat;
}
