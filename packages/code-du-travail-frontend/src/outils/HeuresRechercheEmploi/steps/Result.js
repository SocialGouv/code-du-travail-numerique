import data from "@cdt/data...simulateurs/heures-recherche-emploi.data.json";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import { Alert } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";

import {
  filterSituations,
  getRef,
  getSituationsFor,
  recapSituation,
} from "../../common/situations.utils";
import { Highlight, SectionTitle } from "../../common/stepStyles";

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
        {wording}
        <br />
        <Highlight>{situation.answer}</Highlight>.
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

function Disclaimer({ duration }) {
  if (!duration) {
    return (
      <Alert>
        Un accord d’entreprise ou à défaut un usage dans la profession ou
        l’entreprise peut prévoir que le salarié bénéficie d’heures d’absence
        autorisée pour rechercher un emploi pendant le préavis.
      </Alert>
    );
  } else {
    return (
      <Alert>
        Si un accord d’entreprise ou à défaut un usage dans la profession ou
        l’entreprise plus récent prévoit des heures d’absence autorisée pour
        rechercher un emploi pendant le préavis, le salarié en bénéficie si ces
        mesures sont plus favorables que la convention collective.
      </Alert>
    );
  }
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
      <p>
        <Highlight>Aucun résultat</Highlight>&nbsp;:&nbsp;{reason}
        {idcc > 0 && (
          <>
            <br />
            Vous pouvez faire une recherche par mots-clés dans{" "}
            <Link href={`/${getRouteBySource(SOURCES.CCN)}/${ccn.slug}`}>
              <a>votre convention collective</a>
            </Link>
          </>
        )}
      </p>
      <p>
        Le code du travail ne prévoit pas le droit pour le salarié de s’absenter
        pendant son préavis pour pouvoir rechercher un nouvel emploi. Il existe
        une exception dans les départements de la Moselle, du Bas-Rhin et du
        Haut-Rhin où le salarié, qui en fait la demande, a droit à un délai
        raisonnable pour rechercher un emploi pendant son préavis de
        licenciement.
      </p>
      <Alert>
        Une convention collective, un accord d’entreprise ou à défaut un usage
        dans la profession ou l’entreprise peut prévoir que le salarié bénéficie
        d’heures d’absence autorisée pour rechercher un emploi pendant le
        préavis. Il peut s’agir du préavis en cas de rupture de la période
        d’essai, de démission ou de licenciement.
      </Alert>
      <SectionTitle>Récapitulatif des éléments saisis</SectionTitle>
      {recapSituation({
        ...(ccn && {
          "Convention collective": `${ccn.shortTitle} (IDCC ${idcc})`,
        }),
      })}
      <SectionTitle>Source</SectionTitle>
      {legalRefs && getRef(legalRefs)}
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
      <Disclaimer duration={situation.answer} />
      <SectionTitle>Récapitulatif des éléments saisis</SectionTitle>
      {recapSituation({
        ...(ccn && {
          "Convention collective": `${ccn.shortTitle} (IDCC ${idcc})`,
        }),
        "Type de rupture du contrat de travail": typeRupture,
        ...situation.criteria,
      })}
      <SectionTitle>Source</SectionTitle>
      {situation.ref && situation.refUrl && getRef([situation])}
    </>
  );
}
