import data from "@cdt/data...simulateurs/preavis-licenciement.data.json";
import { Toast } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";

import { SelectQuestion } from "../../common/SelectQuestion";
import {
  filterSituations,
  getOptions,
  getSituationsFor,
} from "../../common/situations.utils";
import { YesNoQuestion } from "../../common/YesNoQuestion";

const { questions, situations: allSituations } = data;
const questionsMap = questions.reduce(
  (state, { name, question }) => ({ ...state, [name]: question }),
  {}
);

function validate({ seriousMisconduct }) {
  const errors = {};
  if (seriousMisconduct) {
    errors.seriousMisconduct = (
      <Toast>
        Dans le cas d’un licenciement pour faute grave ou lourde, il n’y pas
        d’obligation de respecter un préavis.Vous pouvez trouver plus
        d’informations sur le préavis de licenciement sur{" "}
        <Link href={`/fiche-service-public/preavis-de-licenciement`}>
          <a>cette fiche</a>
        </Link>
        .
      </Toast>
    );
  }
  return errors;
}

function StepStatus({ form }) {
  const { seriousMisconduct, disabledWorker } = form.getState().values;
  const seniorityKey = "ancienneté";

  const initialSituations = getSituationsFor(allSituations, { idcc: 0 });
  const possibleSituations = filterSituations(initialSituations, {});
  const seniorityOptions = getOptions(possibleSituations, seniorityKey);

  return (
    <>
      <YesNoQuestion
        name="seriousMisconduct"
        label="Le licenciement est-il dû à une faute grave (ou lourde) ?"
      />
      {seriousMisconduct === false && (
        <>
          <YesNoQuestion
            name="disabledWorker"
            label="Le salarié concerné est-il reconnu en tant que travailleur handicapé ?"
          />
        </>
      )}
      {typeof disabledWorker !== "undefined" && !seriousMisconduct && (
        <SelectQuestion
          name={`cdt.${seniorityKey}`}
          label={questionsMap[seniorityKey]}
          subLabel="Choissisez parmi les catégories d'ancienneté telles que définies par le Code du travail"
          options={seniorityOptions}
        />
      )}
    </>
  );
}

StepStatus.validate = validate;

export { StepStatus };
