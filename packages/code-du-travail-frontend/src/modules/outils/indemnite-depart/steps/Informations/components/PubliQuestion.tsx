import React from "react";

import { Rule, RuleType } from "@socialgouv/modeles-social";
import {
  RadioQuestion,
  SelectQuestion,
  TextQuestion,
} from "../../../../common/components";
import { reverseValues } from "../../../../common/publicodes";

export type InputUnit = "€" | "an" | "semestre" | "mois" | "jour" | "pourcent";

interface Props {
  name: string;
  rule: Rule;
  value: string | undefined;
  onChange: (value: unknown) => void;
  error?: string;
  alertError?: string;
  autoFocus?: boolean;
}

export const PubliQuestion: React.FC<Props> = ({
  name,
  rule,
  value,
  onChange,
  error,
  autoFocus = false,
}) => {
  const [randomId] = React.useState(
    // to avoid collision with other components for YesNoQuestion
    Math.random().toString(36).substring(2, 15)
  );
  const { question, cdtn, description } = rule;

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
          subLabel={description}
          autoFocus={autoFocus}
        />
      );
    case RuleType.OuiNon:
      return (
        <RadioQuestion
          questions={[
            {
              label: "Oui",
              value: `'Oui'`,
              id: `oui-${randomId}`,
            },
            {
              label: "Non",
              value: `'Non'`,
              id: `non-${randomId}`,
            },
          ]}
          name={name}
          label={question}
          selectedOption={value}
          onChangeSelectedOption={onChange}
          error={error}
          subLabel={description}
          autoFocus={autoFocus}
        />
      );
    case RuleType.Montant:
      return (
        <TextQuestion
          label={question}
          inputType="number"
          value={value}
          onChange={onChange}
          error={error}
          id={name}
          subLabel={description}
          dataTestId={name}
          autoFocus={autoFocus}
          unit={rule.unité as InputUnit}
        />
      );
    case RuleType.Date:
      return (
        <TextQuestion
          label={question}
          subLabel={description}
          inputType="date"
          value={value}
          onChange={onChange}
          error={error}
          id={name}
          dataTestId={name}
          autoFocus={autoFocus}
        />
      );
    default:
      return (
        <TextQuestion
          label={question}
          subLabel={description}
          inputType="number"
          value={value}
          onChange={onChange}
          error={error}
          id={name}
          dataTestId={name}
          autoFocus={autoFocus}
          unit={rule.unité as InputUnit}
        />
      );
  }
};
