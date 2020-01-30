import React from "react";
import Link from "next/link";
import { getRouteBySource, SOURCES } from "@cdt/sources";
import { Alert } from "@socialgouv/react-ui";
import data from "@cdt/data...simulateurs/heures-recherche-emploi.data.json";
import { SectionTitle, Highlight } from "../../common/stepStyles";

import {
  filterSituations,
  getSituationsFor,
  recapSituation
} from "../../common/situations.utils";

function Duration({ duration }) {
  if (parseInt(duration, 10) === 0) {
    return (
      <p>
        La convention collective ne prévoit pas cette possibilité. Il n’est donc
        pas possible de bénéficier d’heures de recherche d’emploi au regard de
        la situation renseignée.
      </p>
    );
  }
  return (
    <>
      <p>
        À partir des éléments que vous avez saisis, le nombre d’heures pour
        recherche d’emploi est estimé à&nbsp;:
      </p>
      <p>
        <Highlight>{duration}</Highlight>.
      </p>
    </>
  );
}

function Disclaimer({ duration }) {
  if (parseInt(duration, 10) === 0) {
    return (
      <Alert>
        Un accord d’entreprise ou à défaut un usage dans la profession ou
        l’entreprise plus récent peut prévoir l’existence, le cadre et la durée
        des absences pour rechercher un emploi au cours du préavis.
      </Alert>
    );
  } else {
    return (
      <Alert>
        Un accord d’entreprise ou à défaut un usage dans la profession ou
        l’entreprise plus récent peut prévoir l’existence, le cadre et une durée
        différentes des absences pour rechercher un emploi au cours du préavis.
      </Alert>
    );
  }
}

function LienSource() {
  return (
    <p>
      <Link
        href={`/${getRouteBySource(SOURCES.CDT)}/[slug]`}
        as={`/${getRouteBySource(SOURCES.CDT)}/l1234-7`}
      >
        <a>Article L1234-17</a>
      </Link>{" "}
      du code du travail (dispositions spécifiques Alsace Moselle)
    </p>
  );
}

function NoResult({ idcc, ccn }) {
  let result =
    "Aucun résultat : la convention collective n'a pas encore été traitée par nos services.";
  if (idcc === 0) {
    result =
      "Aucun résultat : la convention collective n'a pas été renseignée.";
  }
  return (
    <>
      <SectionTitle>Nombre d’heures</SectionTitle>
      <Highlight>{result}</Highlight>
      <p>
        Le code du travail ne prévoit pas le droit pour le salarié de s’absenter
        pendant son préavis pour pouvoir rechercher un nouvel emploi. Il existe
        une exception dans les départements de la Moselle, du Bas-Rhin et du
        Haut-Rhin où le salarié, qui en fait la demande, a droit à un « délai
        raisonnable » pour rechercher un emploi.
      </p>
      <Alert>
        Une convention collective, un accord d’entreprise ou un usage dans la
        profession ou l’entreprise peut prévoir et encadrer des absences pour
        rechercher un emploi au cours du préavis.
        {idcc > 0 && (
          <>
            <br />
            Vous pouvez faire une recherche par mots-clés dans{" "}
            <Link
              href={`/${getRouteBySource(SOURCES.CCN)}/[slug]`}
              as={`/${getRouteBySource(SOURCES.CCN)}/${ccn.convention.slug}`}
            >
              <a>votre convention collective</a>
            </Link>
          </>
        )}
      </Alert>
      <SectionTitle>Source</SectionTitle>
      <LienSource />
    </>
  );
}

export function StepResult({ form }) {
  const { values } = form.getState();
  const { ccn, criteria = {} } = values;
  const idcc = ccn ? ccn.convention.num : 0;

  const initialSituations = getSituationsFor(data.situations, { idcc });
  const possibleSituations = filterSituations(initialSituations, criteria);

  if (idcc === 0 || possibleSituations.length === 0) {
    return <NoResult idcc={idcc} ccn={ccn} />;
  }

  const [situation] = possibleSituations;
  return (
    <>
      <SectionTitle>Nombre d’heure</SectionTitle>
      <Duration duration={situation.answer} />
      <Disclaimer duration={situation.answer} />
      <SectionTitle>Détails</SectionTitle>
      {recapSituation({
        ...(ccn && { "Convention collective": ccn.convention.shortTitle }),
        ...situation.criteria
      })}
      <SectionTitle>Source</SectionTitle>
      <LienSource />
    </>
  );
}
