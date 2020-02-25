import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Toast } from "@socialgouv/react-ui";
import { getRouteBySource, SOURCES } from "@cdt/sources";
import data from "@cdt/data...simulateurs/preavis-demission.data.json";

import { SectionTitle, Highlight } from "../../common/stepStyles";

import {
  filterSituations,
  getSituationsFor,
  recapSituation,
  getRef
} from "../../common/situations.utils";

function HdnToast({ ccn }) {
  return (
    <Toast>
      L’existence ou la durée du préavis de démission peut être prévue par une
      convention collective, un accord d’entreprise ou à défaut, par un usage
      dans l’entreprise.
      {ccn && (
        <>
          <br />
          Vous pouvez faire une recherche par mots-clés dans{" "}
          <Link
            href={`/${getRouteBySource(SOURCES.CCN)}/[slug]`}
            as={`/${getRouteBySource(SOURCES.CCN)}/${ccn.slug}`}
          >
            <a>votre convention collective</a>
          </Link>
        </>
      )}
    </Toast>
  );
}

function StepResult({ form }) {
  const { values } = form.getState();
  const { ccn, criteria = {} } = values;
  const idcc = ccn ? ccn.num : 0;

  const initialSituations = getSituationsFor(data.situations, { idcc });
  const possibleSituations = filterSituations(initialSituations, criteria);

  const refLegal = {
    ref: " Article L.1237-1 du code du travail",
    refUrl:
      "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000006901174"
  };

  // No ccn selected or UunhandledCC
  if (idcc === 0 || possibleSituations.length === 0) {
    let reason =
      "la convention collective n’a pas encore été traitée par nos services.";
    if (idcc === 0) {
      reason = "la convention collective n’a pas été renseignée.";
    }
    return (
      <>
        <SectionTitle>Durée du préavis</SectionTitle>
        <p>
          <Highlight>Aucun résultat</Highlight>&nbsp;:&nbsp;{reason}
        </p>
        <p>
          Le code du travail ne prévoit pas de durée de préavis de démission
          sauf, cas particuliers.
        </p>
        <HdnToast ccn={ccn} />
        <SectionTitle>Source</SectionTitle>
        {getRef([refLegal])}
      </>
    );
  }
  // CCn Selected
  const [situation] = possibleSituations;
  return (
    <>
      <SectionTitle>Durée du préavis</SectionTitle>
      <p>
        À partir des éléments que vous avez saisis, la durée du préavis de
        démission est estimée à&nbsp;<Highlight>{situation.answer}</Highlight>.
      </p>
      {parseInt(situation.answer3, 10) === 0 && (
        <p>
          Le code du travail ne prévoit pas de durée de préavis de démission
          sauf, cas particuliers.
        </p>
      )}
      <HdnToast />
      <SectionTitle>Détails</SectionTitle>
      Éléments saisis&nbsp;:
      <br />
      {recapSituation({
        "Convention collective": `${ccn.title} (${idcc})`,
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
