import React from "react";

import { Rule, RuleType } from "@socialgouv/modeles-social";
import Html from "../../../../common/Html";
import {
  RadioQuestion,
  SelectQuestion,
  TextQuestion,
} from "../../../Components";
import { reverseValues } from "../../../publicodes";
import { MatomoActionEvent, trackQuestion } from "../../../../lib";

interface Props {
  name: string;
  rule: Rule;
  trackQuestionEvent: MatomoActionEvent;
  value: string;
  onChange: (value: unknown) => void;
  error?: string;
  alertError?: string;
}

const PubliQuestion: React.FC<Props> = ({
  name,
  rule,
  trackQuestionEvent,
  value,
  onChange,
  error,
}) => {
  const [randomId] = React.useState(
    // to avoid collision with other components for YesNoQuestion
    Math.random().toString(36).substring(2, 15)
  );
  const { question, titre, cdtn } = rule;
  const tooltip = rule.description
    ? {
        content: <Html>{rule.description}</Html>,
        trackableFn: (visibility: boolean) => {
          if (visibility && titre && trackQuestionEvent) {
            trackQuestion(titre, trackQuestionEvent);
          }
        },
      }
    : undefined;

  if (!question) {
    return <></>;
  }
  switch (cdtn?.type) {
    case RuleType.Liste:
      return (
        <SelectQuestion
          name={name}
          label={question}
          options={reverseValues(cdtn.valeurs)}
          selectedOption={value}
          onChangeSelectedOption={onChange}
          error={error}
          tooltip={tooltip}
          showRequired
        />
      );
    case RuleType.OuiNon:
      return (
        <RadioQuestion
          questions={[
            {
              label: "Oui",
              value: `oui`,
              id: `oui-${randomId}`,
            },
            {
              label: "Non",
              value: `non`,
              id: `non-${randomId}`,
            },
          ]}
          name={name}
          label={question}
          selectedOption={value}
          onChangeSelectedOption={onChange}
          error={error}
          showRequired
        />
      );
    default:
      return (
        <TextQuestion
          label={question}
          tooltip={tooltip}
          inputType="text"
          value={value}
          onChange={onChange}
          error={error}
          id={name}
          showRequired
        />
      );
  }
};

export default PubliQuestion;
