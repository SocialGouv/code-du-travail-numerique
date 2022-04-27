import data from "@cdt/data...simulateurs/heures-recherche-emploi.data.json";
import { Paragraph } from "@socialgouv/cdtn-ui";
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
import { HighlightResult, SectionTitle } from "../../common/stepStyles";
import { formatRefs } from "../../publicodes";
import { WizardStepProps } from "../../common/type/WizardType";

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
    <Disclaimer title={"Attention il peut exister une durée plus favorable"}>
      {duration ? (
        <p>
          Si un accord d’entreprise ou à défaut un usage dans la profession ou
          l’entreprise plus récent prévoit des heures d’absence autorisée pour
          rechercher un emploi pendant le préavis, le salarié en bénéficie si
          ces mesures sont plus favorables que la convention collective.
        </p>
      ) : (
        <p>
          Un accord d’entreprise ou à défaut un usage dans la profession ou
          l’entreprise peut prévoir que le salarié bénéficie d’heures d’absence
          autorisée pour rechercher un emploi pendant le préavis.
        </p>
      )}
    </Disclaimer>
  );
}

const NoResult = ({ idcc, ccn, legalRefs }) => (
  <>
    <SectionTitle>
      Nombre d’heures d’absence autorisée pour rechercher un emploi
    </SectionTitle>
    <Paragraph noMargin>
      <HighlightResult>Aucun résultat</HighlightResult>&nbsp;:&nbsp;la
      convention collective n’a pas encore été traitée par nos services.
    </Paragraph>
    <CCSearchInfo ccn={ccn} />
    <p>
      Le code du travail ne prévoit pas le droit pour le salarié de s’absenter
      pendant son préavis pour pouvoir rechercher un nouvel emploi. Il existe
      une exception dans les départements de la Moselle, du Bas-Rhin et du
      Haut-Rhin où le salarié, qui en fait la demande, a droit à un délai
      raisonnable pour rechercher un emploi pendant son préavis de licenciement.
    </p>
    <ShowDetails>
      <SectionTitle>Éléments saisis</SectionTitle>
      {recapSituation({
        ...{
          "Convention collective": `${ccn.shortTitle} (IDCC ${idcc})`,
        },
      })}
      <PubliReferences references={legalRefs && formatRefs(legalRefs)} />
    </ShowDetails>
    <Disclaimer title={"Attention il peut exister une durée plus favorable"}>
      <p>
        Une convention collective, un accord d’entreprise ou à défaut un usage
        dans la profession ou l’entreprise peut prévoir que le salarié bénéficie
        d’heures d’absence autorisée pour rechercher un emploi pendant le
        préavis. Il peut s’agir du préavis en cas de rupture de la période
        d’essai, de démission ou de licenciement.
      </p>
    </Disclaimer>
  </>
);

export function StepResult({ form }: WizardStepProps): JSX.Element {
  const { values } = form.getState();
  const { ccn, criteria = {}, typeRupture } = values;
  const idcc = ccn?.selected ? ccn.selected.num : 0;

  const [situationCdt] = getSituationsFor(data.situations, {
    idcc: 0,
  });
  const initialSituations = getSituationsFor(data.situations, {
    idcc,
    typeRupture,
  });
  const possibleSituations = filterSituations(initialSituations, criteria);
  if (possibleSituations.length === 0) {
    return (
      <NoResult idcc={idcc} ccn={ccn?.selected} legalRefs={[situationCdt]} />
    );
  }

  const [situation] = possibleSituations;
  return (
    <>
      <SectionTitle>
        Nombre d’heures d’absence autorisée pour rechercher un emploi
      </SectionTitle>
      <Duration situation={situation} />
      <ShowDetails>
        <SectionTitle>Éléments saisis</SectionTitle>
        {recapSituation({
          ...(ccn?.selected && {
            "Convention collective": `${ccn.selected.shortTitle} (IDCC ${idcc})`,
          }),
          "Type de rupture du contrat de travail": typeRupture,
          ...situation.criteria,
        })}

        <PubliReferences
          references={
            situation.ref && situation.refUrl && formatRefs([situation])
          }
        />
      </ShowDetails>
      <DisclaimerBox duration={situation.answer} />
    </>
  );
}
