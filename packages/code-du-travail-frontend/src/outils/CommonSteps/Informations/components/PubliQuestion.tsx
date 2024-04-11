import React from "react";

import { Rule, RuleType } from "@socialgouv/modeles-social";
import Html from "../../../../common/Html";
import {
  RadioQuestion,
  SelectQuestion,
  TextQuestion,
} from "../../../Components";
import { reverseValues } from "../../../publicodes";
import { EventType, GlobalEvent, eventEmitter } from "../../../../lib";

interface Props {
  name: string;
  rule: Rule;
  value: string | undefined;
  onChange: (value: unknown) => void;
  error?: string;
  alertError?: string;
  autoFocus?: boolean;
}

const PubliQuestion: React.FC<Props> = ({
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
  const { question, titre, cdtn, unité } = rule;
  const tooltip = rule.description
    ? {
        content: <Html>{rule.description}</Html>,
        trackableFn: (visibility: boolean) => {
          if (visibility && titre) {
            eventEmitter.dispatch(
              GlobalEvent.INDEMNITE_LICENCIEMENT, // ça bloque ici
              EventType.TRACK_QUESTION,
              titre
            );
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
          subLabel={cdtn.precision}
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
          tooltip={tooltip}
          onChangeSelectedOption={onChange}
          error={error}
          showRequired
          subLabel={cdtn.precision}
          autoFocus={autoFocus}
        />
      );
    case RuleType.Montant:
      return (
        <TextQuestion
          label={question}
          tooltip={tooltip}
          inputType="number"
          value={value}
          onChange={onChange}
          error={error}
          id={name}
          showRequired
          text={unité}
          subLabel={cdtn.precision}
          dataTestId={name}
          autoFocus={autoFocus}
        />
      );
    case RuleType.Date:
      return (
        <TextQuestion
          label={question}
          tooltip={tooltip}
          inputType="date"
          value={value}
          onChange={onChange}
          error={error}
          id={name}
          placeholder={"jj/mm/aaaa"}
          showRequired
          dataTestId={name}
          autoFocus={autoFocus}
        />
      );
    default:
      return (
        <TextQuestion
          label={question}
          tooltip={tooltip}
          inputType="number"
          value={value}
          onChange={onChange}
          text={unité}
          error={error}
          id={name}
          showRequired
          subLabel={cdtn?.precision}
          dataTestId={name}
          autoFocus={autoFocus}
        />
      );
  }
};

export default PubliQuestion;
