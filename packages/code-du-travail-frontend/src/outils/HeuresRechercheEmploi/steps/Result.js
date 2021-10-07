import data from "@cdt/data...simulateurs/heures-recherche-emploi.data.json";
import { Accordion } from "@socialgouv/cdtn-ui";
import React from "react";

import CCSearchInfo from "../../common/CCSearchInfo";
import Disclaimer from "../../common/Disclaimer";
import PubliReferences from "../../common/PubliReferences";
import {
  filterSituations,
  getSituationsFor,
  recapSituation,
} from "../../common/situations.utils";
import { HighlightResult, SectionTitle } from "../../common/stepStyles";
import { formatRefs } from "../../publicodes/Utils";

function Duration({ situation }) {
  if (!situation.answer) {
    return (
      <p>
        D’après les éléments saisis, dans votre situation, la convention
        collective ne prévoit pas d’heures d’absence autorisée pour rechercher
        un emploi.
      </p>
    );
  }

  const wording = /rupture en cours de période d'essai/i.test(
    situation.typeRupture
  )
    ? "D’après les éléments saisis, durant son préavis (ou délai de prévenance), le salarié peut s’absenter pour rechercher un emploi pendant"
    : "D’après les éléments saisis, durant son préavis, le salarié peut s’absenter pour rechercher un emploi pendant";
  return (
    <>
      <p>
        {wording}&nbsp;: <HighlightResult>{situation.answer}</HighlightResult>.
      </p>
      {situation.answer2 && (
        <>
          <SectionTitle>
            Rémunération pendant les heures d’absence autorisée
          </SectionTitle>
          <p>{situation.answer2}</p>
        </>
      )}
      {situation.answer3 && (
        <>
          <SectionTitle>Conditions d’utilisation</SectionTitle>
          <p>{situation.answer3}</p>
        </>
      )}
    </>
  );
}

function DisclaimerBox({ duration }) {
  return (
    <Disclaimer
      title={"Attention il peut exister une durée plus favorable"}
      text={
        duration ? (
          <p>
            Si un accord d’entreprise ou à défaut un usage dans la profession ou
            l’entreprise plus récent prévoit des heures d’absence autorisée pour
            rechercher un emploi pendant le préavis, le salarié en bénéficie si
            ces mesures sont plus favorables que la convention collective.
          </p>
        ) : (
          <p>
            Un accord d’entreprise ou à défaut un usage dans la profession ou
            l’entreprise peut prévoir que le salarié bénéficie d’heures
            d’absence autorisée pour rechercher un emploi pendant le préavis.
          </p>
        )
      }
    />
  );
}

function NoResult({ idcc, ccn, legalRefs }) {
  let reason =
    "la convention collective n’a pas encore été traitée par nos services.";
  if (idcc === 0) {
    reason = "la convention collective n’a pas été renseignée.";
  }
  return (
    <>
      <SectionTitle>
        Nombre d’heures d’absence autorisée pour rechercher un emploi
      </SectionTitle>
      <HighlightResult>Aucun résultat</HighlightResult>&nbsp;:&nbsp;{reason}
      {idcc > 0 && <CCSearchInfo ccn={ccn} />}
      <p>
        Le code du travail ne prévoit pas le droit pour le salarié de s’absenter
        pendant son préavis pour pouvoir rechercher un nouvel emploi. Il existe
        une exception dans les départements de la Moselle, du Bas-Rhin et du
        Haut-Rhin où le salarié, qui en fait la demande, a droit à un délai
        raisonnable pour rechercher un emploi pendant son préavis de
        licenciement.
      </p>
      <Accordion
        items={[
          {
            body: (
              <>
                <SectionTitle>Éléments saisis</SectionTitle>
                {recapSituation({
                  ...{
                    "Convention collective": ccn
                      ? `${ccn.shortTitle} (IDCC ${idcc})`
                      : "La convention collective n'a pas été renseignée",
                  },
                })}
                <PubliReferences
                  references={legalRefs && formatRefs(legalRefs)}
                />
              </>
            ),
            title: <p>Voir le détail du calcul</p>,
          },
        ]}
      />
      <DisclaimerBox
        title={"Attention il peut exister une durée plus favorable"}
        text={
          <p>
            Une convention collective, un accord d’entreprise ou à défaut un
            usage dans la profession ou l’entreprise peut prévoir que le salarié
            bénéficie d’heures d’absence autorisée pour rechercher un emploi
            pendant le préavis. Il peut s’agir du préavis en cas de rupture de
            la période d’essai, de démission ou de licenciement.
          </p>
        }
      />
    </>
  );
}

export function StepResult({ form }) {
  const { values } = form.getState();
  const { ccn, criteria = {}, typeRupture } = values;
  const idcc = ccn ? ccn.num : 0;

  const [situationCdt] = getSituationsFor(data.situations, {
    idcc: 0,
  });
  const initialSituations = getSituationsFor(data.situations, {
    idcc,
    typeRupture,
  });
  const possibleSituations = filterSituations(initialSituations, criteria);
  if (idcc === 0 || possibleSituations.length === 0) {
    return (
      <NoResult
        idcc={idcc}
        ccn={ccn}
        legalRefs={[situationCdt]}
        typeRupture={typeRupture}
      />
    );
  }

  const [situation] = possibleSituations;
  return (
    <>
      <SectionTitle>
        Nombre d’heures d’absence autorisée pour rechercher un emploi
      </SectionTitle>
      <Duration situation={situation} />
      <Accordion
        items={[
          {
            body: (
              <>
                <SectionTitle>Éléments saisis</SectionTitle>
                {recapSituation({
                  ...(ccn && {
                    "Convention collective": `${ccn.shortTitle} (IDCC ${idcc})`,
                  }),
                  "Type de rupture du contrat de travail": typeRupture,
                  ...situation.criteria,
                })}

                <PubliReferences
                  references={
                    situation.ref && situation.refUrl && formatRefs([situation])
                  }
                />
              </>
            ),
            title: <p>Voir le détail du calcul</p>,
          },
        ]}
      />
      <DisclaimerBox duration={situation.answer} />
    </>
  );
}
