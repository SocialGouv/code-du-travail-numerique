import React from "react";
import Link from "next/link";
import data from "@cdt/data...preavis-licenciement/data.json";
import { Toast } from "@socialgouv/react-ui";
import { YesNoQuestion } from "../../common/YesNoQuestion";
import { SelectQuestion } from "../../common/SelectQuestion";
import {
  getOptions,
  filterSituations,
  getSituationsFor
} from "../../common/situations.utils";

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
        <Link
          href="/fiche-service-public/[slug]"
          as={`/fiche-service-public/preavis-de-licenciement`}
        >
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

  const initialSituations = getSituationsFor(allSituations, { idcc: "0000" });
  const possibleSituations = filterSituations(initialSituations, {});
  const seniorityOptions = getOptions(possibleSituations, seniorityKey);

  return (
    <>
      <YesNoQuestion
        name="seriousMisconduct"
        label="S’agit-il d’un licenciement pour faute grave ou lourde ?"
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
