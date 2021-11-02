import React from "react";

import { Rule, RuleType } from "../publicodes";
import { reverseValues } from "../publicodes/Utils";
import { SelectQuestion } from "./SelectQuestion";
import { TextQuestion } from "./TextQuestion";
import { YesNoPubliQuestion } from "./YesNoPubliQuestion";

interface Props {
  name: string;
  rule: Rule;
  onChange?: () => void;
}

const PubliQuestion: React.FC<Props> = ({ name, rule, onChange }) => {
  const tooltip = rule.description
    ? { content: <p>{rule.description}</p> }
    : null;

  switch (rule?.cdtn?.type) {
    case RuleType.Liste:
      return (
        <SelectQuestion
          name={name}
          label={rule.question}
          options={reverseValues(rule.cdtn.valeurs)}
          onChange={onChange}
          tooltip={tooltip}
        />
      );
    case RuleType.OuiNon:
      return (
        <YesNoPubliQuestion
          name={name}
          label={rule.question}
          tooltip={tooltip}
        />
      );
    default:
      return (
        <TextQuestion
          name={name}
          label={rule.question}
          tooltip={tooltip}
          validate={undefined}
        />
      );
  }
};

export default PubliQuestion;
