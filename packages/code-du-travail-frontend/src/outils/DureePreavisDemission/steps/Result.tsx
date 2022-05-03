import data from "@cdt/data...simulateurs/preavis-demission.data.json";
import PropTypes from "prop-types";
import React from "react";
import Disclaimer from "../../common/Disclaimer";
import { NoticeExample, Simulator } from "../../common/NoticeExample";
import { NoticeNote } from "../../common/NoticeNote";
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
import { calculateNumberOfElements } from "../../utils";

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

function StepResult({ form }: WizardStepProps): JSX.Element {
  const { values } = form.getState();
  const { ccn, criteria = {} } = values;
  const idcc = ccn?.selected ? ccn.selected.num : 0;

  const initialSituations = getSituationsFor(data.situations, { idcc });
  const possibleSituations = filterSituations(initialSituations, criteria);

  const refLegal = {
    ref: " Article L.1237-1 du code du travail",
    refUrl:
      "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000006901174",
  };

  const [situation] = possibleSituations;
  return (
    <>
      <SectionTitle>Durée du préavis</SectionTitle>
      {situation.answer ? (
        <p>
          À partir des éléments que vous avez saisis, la durée du préavis de
          démission est estimée à&nbsp;:&nbsp;
          <HighlightResult>{situation.answer}</HighlightResult>
          <NoticeNote
            isList
            numberOfElements={calculateNumberOfElements(
              situation.answer,
              situation.note
            )}
          />
          .
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
      {situation.answer && (
        <NoticeExample
          simulator={Simulator.PREAVIS_DEMISSION}
          period={situation.answer}
          note={
            <NoticeNote
              numberOfElements={calculateNumberOfElements(
                situation.answer,
                situation.note
              )}
              currentElement={1}
            />
          }
        />
      )}
      {situation.note && (
        <SmallText>
          <NoticeNote
            numberOfElements={calculateNumberOfElements(
              situation.answer,
              situation.note
            )}
            currentElement={calculateNumberOfElements(situation.answer) + 1}
          />
          {situation.note}
        </SmallText>
      )}
      <ShowDetails>
        <SectionTitle>Éléments saisis</SectionTitle>
        {recapSituation({
          "Convention collective": `${ccn?.selected?.title} (${idcc})`,
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
