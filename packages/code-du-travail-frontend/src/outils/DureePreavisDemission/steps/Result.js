import data from "@cdt/data...simulateurs/preavis-demission.data.json";
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

function Disclaimer({ ccn }) {
  return (
    <Warning>
      <IconStripe centered icon={icons.Warning}>
        <WarningTitle>
          Attention il peut exister une autre durée de préavis
        </WarningTitle>
      </IconStripe>
      <p>
        L’existence ou la durée du préavis de démission peut être prévue par une
        convention collective, un accord d’entreprise ou à défaut, par un usage
        dans l’entreprise.
      </p>
      {ccn && (
        <p>
          Vous pouvez faire une recherche par mots-clés dans{" "}
          <Link href={`/${getRouteBySource(SOURCES.CCN)}/${ccn.slug}`}>
            <a>votre convention collective</a>
          </Link>
        </p>
      )}
    </Warning>
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
      "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000006901174",
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
          <HighlightResult>Aucun résultat</HighlightResult>&nbsp;:&nbsp;{reason}
        </p>
        <p>
          Le code du travail ne prévoit pas de durée de préavis de démission
          sauf, cas particuliers.
        </p>
        <Disclaimer ccn={ccn} />
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
        démission est estimée à&nbsp;
        <HighlightResult>{situation.answer}</HighlightResult>.
      </p>
      {parseInt(situation.answer3, 10) === 0 && (
        <p>
          Le code du travail ne prévoit pas de durée de préavis de démission
          sauf, cas particuliers.
        </p>
      )}

      <Accordion
        items={[
          {
            body: (
              <>
                <SectionTitle>Éléments saisis</SectionTitle>
                {recapSituation({
                  "Convention collective": `${ccn.title} (${idcc})`,
                  ...situation.criteria,
                })}

                <SectionTitle>Source</SectionTitle>
                {getRef([refLegal, situation])}
              </>
            ),
            title: <p>Voir le détail du calcul</p>,
          },
        ]}
      />
      <Disclaimer />
    </>
  );
}

StepResult.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired,
  }),
};

export { StepResult };
