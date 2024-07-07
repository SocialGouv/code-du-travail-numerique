import React from "react";
import { Question, Tooltip } from "../common/Question";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";

type Question = {
  label: string;
  value: string;
  id: string;
};

type Props = {
  onChangeSelectedOption: (value: unknown) => void;
  selectedOption: string | undefined;
  error?: string;
  label: string;
  questions: Question[];
  showRequired?: boolean;
  name: string;
  tooltip?: Tooltip;
  subLabel?: string;
  note?: string;
  autoFocus?: boolean;
};

export default function RadioQuestion({
  selectedOption,
  onChangeSelectedOption,
  error,
  label,
  questions,
  showRequired,
  name,
  tooltip,
  subLabel,
  note,
  autoFocus = false,
}: Props) {
  const onChange = (value: string) => {
    onChangeSelectedOption(value);
  };

  return (
    <RadioButtons
      hintText={subLabel}
      legend={label}
      name={name}
      options={questions.map((question, index) => ({
        label: question.label,
        nativeInputProps: {
          required: showRequired,
          checked: selectedOption === question.value,
          onChange: () => onChange(question.value),
          "data-testid": `${name} - ${question.label}`,
        },
      }))}
      state={error ? "error" : "default"}
      stateRelatedMessage={error}
    />
  );
}

/*
<Question required={showRequired} tooltip={tooltip}>
          <Html as="span">{label}</Html>
        </Question>
        {subLabel && <SubLabel>{subLabel}</SubLabel>}
        <RadioContainer>
          {questions.map((question, index) => (
            <InputRadio
              key={index}
              name={name}
              label={question.label}
              value={question.value}
              id={question.id}
              data-testid={`${name} - ${question.label}`}
              checked={selectedOption === question.value}
              onChange={() => onChange(question.value)}
              autoFocus={autoFocus ? index === 0 : false}
            />
          ))}
          {error && <Error>{error}</Error>}
        </RadioContainer>
        {note && <SmallText as="i">{note}</SmallText>}
 */
