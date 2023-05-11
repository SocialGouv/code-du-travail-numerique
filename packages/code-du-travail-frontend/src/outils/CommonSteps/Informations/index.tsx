import React from "react";

import { PubliQuestion } from "./components";
import { MatomoActionEvent } from "../../../lib";
import { PublicodesInformation } from "./store";
import { RuleType } from "@socialgouv/modeles-social";

export type InformationStepProps = {
  onChange: (key: string, value: unknown, type: RuleType | undefined) => void;
  informations: PublicodesInformation[];
  errors: Record<string, string>;
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
          error={errors[info.question.rule.nom] ?? undefined}
        />
      );
    })}
  </>
);

export default CommonInformationStep;
