import React from "react";

import Html from "../../common/Html";
import { MatomoActionEvent, trackQuestion } from "../../lib";
import { reverseValues } from "../publicodes";
import { SelectQuestion } from "./SelectQuestion";
import { TextQuestion } from "./TextQuestion";
import { YesNoPubliQuestion } from "./YesNoPubliQuestion";
import { Rule, RuleType } from "@socialgouv/modeles-social";

interface Props {
  name: string;
  rule: Rule;
  onChange?: (values?: unknown) => void;
}

const PubliQuestion: React.FC<Props> = ({ name, rule, onChange }) => {
  const { question, titre, cdtn } = rule;
  const tooltip = rule.description
    ? {
        content: <Html>{rule.description}</Html>,
        trackableFn: (visibility: boolean) => {
          if (visibility && titre) {
            trackQuestion(titre, MatomoActionEvent.PREAVIS_RETRAITE);
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
          onChange={onChange}
          tooltip={tooltip}
        />
      );
    case RuleType.OuiNon:
      return (
        <YesNoPubliQuestion
          name={name}
          label={question}
          tooltip={tooltip}
          onChange={onChange}
        />
      );
    default:
      return (
        <TextQuestion
          name={name}
          label={question}
          tooltip={tooltip}
          validate={undefined}
        />
      );
  }
};

export default PubliQuestion;
