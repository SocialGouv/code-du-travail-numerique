import React from "react";
import Link from "next/link";
import data from "@cdt/data...preavis-licenciement/data.json";
import { Toast } from "@socialgouv/react-ui";
import { YesNoQuestion } from "../../common/YesNoQuestion";
import { SelectQuestion } from "../../common/SelectQuestion";
import {
  getOptions,
  getNextQuestionKey,
  filterSituations,
  getSituationsFor
} from "../../common/situations.utils";

import { questions } from "./situation.js";

function validate() {
  const errors = {};
  return errors;
}

function StepStatus({ form }) {
  const { fauteGrave, travailleurHandicape } = form.getState().values;
  const initialSituations = getSituationsFor(data, { idcc: "0000" });

  const possibleSituations = filterSituations(initialSituations, {});
  const nextQuestionKey = getNextQuestionKey(possibleSituations, {});
  const nextQuestionOptions = getOptions(possibleSituations, nextQuestionKey);

  return (
    <>
      <YesNoQuestion
        name="fauteGrave"
        label="S’agit-il d’un licenciement pour faute grave ou lourde ?"
      />
      {fauteGrave === true && (
        <Toast variant="warning">
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
      )}
      {fauteGrave === false && (
        <>
          <YesNoQuestion
            name="travailleurHandicape"
            label="Le salarié concerné est-il reconnu en tant que travailleur handicapé ?"
          />
        </>
      )}
      {typeof travailleurHandicape !== "undefined" && (
        <SelectQuestion
          name={`cdt.${nextQuestionKey}`}
          label={questions[nextQuestionKey]}
          options={nextQuestionOptions}
        />
      )}
    </>
  );
}
StepStatus.validate = validate;

export { StepStatus };
