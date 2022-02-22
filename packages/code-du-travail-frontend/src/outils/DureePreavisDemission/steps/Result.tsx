import data from "@cdt/data...simulateurs/preavis-demission.data.json";
import PropTypes from "prop-types";
import React from "react";

import CCSearchInfo from "../../common/CCSearchInfo";
import Disclaimer from "../../common/Disclaimer";
import PubliReferences from "../../common/PubliReferences";
import ShowDetails from "../../common/ShowDetails";
import {
  filterSituations,
  getSituationsFor,
  recapSituation,
} from "../../common/situations.utils";
import {
  HighlightResult,
  SectionTitle,
  SmallText,
} from "../../common/stepStyles";
import { WizardStepProps } from "../../common/type/WizardType";
import { formatRefs } from "../../publicodes/";

function DisclaimerBox() {
  return (
    <Disclaimer title={"Attention il peut exister une autre durée de préavis"}>
      <p>
        L’existence ou la durée du préavis de démission peut être prévue par un
        accord d’entreprise ou à défaut, par un usage dans l’entreprise.
      </p>
    </Disclaimer>
  );
}

function DisclaimerBoxNoCC() {
  return (
    <Disclaimer title={"Attention il peut exister une autre durée de préavis"}>
      <p>
        L’existence ou la durée du préavis de démission peut être prévue par une
        convention collective, un accord d’entreprise ou à défaut, par un usage
        dans l’entreprise.
      </p>
    </Disclaimer>
  );
}

function StepResult({ form }: WizardStepProps): JSX.Element {
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

  // No ccn selected or UnhandledCC
  if (!ccn || possibleSituations.length === 0) {
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
        {possibleSituations.length === 0 && ccn && <CCSearchInfo ccn={ccn} />}
        <DisclaimerBoxNoCC />
        <PubliReferences references={formatRefs([refLegal])} />
      </>
    );
  }
  // CCn Selected
  const [situation] = possibleSituations;
  return (
    <>
      <SectionTitle>Durée du préavis</SectionTitle>
      {situation.answer ? (
        <p>
          À partir des éléments que vous avez saisis, la durée du préavis de
          démission est estimée à&nbsp;:
          <HighlightResult>{situation.answer}</HighlightResult>
          {situation.note && <sup>*</sup>}.
        </p>
      ) : (
        <p>
          À partir des éléments que vous avez saisis :{" "}
          <HighlightResult>il n’y a pas de préavis à effectuer</HighlightResult>
          .
        </p>
      )}
      {parseInt(situation.answer3, 10) === 0 && (
        <p>
          Le code du travail ne prévoit pas de durée de préavis de démission
          sauf, cas particuliers.
        </p>
      )}
      {situation.note && (
        <SmallText>
          <sup>*</sup> {situation.note}
        </SmallText>
      )}
      <ShowDetails>
        <SectionTitle>Éléments saisis</SectionTitle>
        {recapSituation({
          "Convention collective": `${ccn.title} (${idcc})`,
          ...situation.criteria,
        })}
        <PubliReferences references={formatRefs([refLegal, situation])} />
      </ShowDetails>
      <DisclaimerBox />
    </>
  );
}

StepResult.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired,
  }),
};

export { StepResult };
