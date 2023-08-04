import React from "react";

import { PubliQuestion } from "./components";
import { MatomoActionEvent } from "../../../lib";
import { CommonInformationsStoreError, PublicodesInformation } from "./store";
import { RuleType } from "@socialgouv/modeles-social";
import { InlineError } from "../../common/ErrorField";

export type InformationStepProps = {
  onChange: (key: string, value: unknown, type: RuleType | undefined) => void;
  informations: PublicodesInformation[];
  errors: CommonInformationsStoreError;
};

const CommonInformationStep = ({
  onChange,
  informations,
  errors,
}: InformationStepProps): JSX.Element => (
  <>
    {informations.map((info) => {
      return (
        <PubliQuestion
          key={info.id}
          name={"infos." + info.question.name}
          rule={info.question.rule}
          trackQuestionEvent={MatomoActionEvent.INDEMNITE_LICENCIEMENT}
          value={info.info}
          onChange={(v) =>
            onChange(info.question.rule.nom, v, info.question.rule.cdtn?.type)
          }
          error={errors.errorInformations[info.question.rule.nom] ?? undefined}
        />
      );
    })}
    {errors.errorPublicodes && (
      <InlineError>
        Une erreur liée au moteur de calcul bloque la simulation.
      </InlineError>
    )}
  </>
);

export default CommonInformationStep;
