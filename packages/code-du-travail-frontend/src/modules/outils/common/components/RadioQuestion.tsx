import React from "react";
import Html from "src/modules/common/Html";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";

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
  name: string;
  subLabel?: string;
  note?: string;
  autoFocus?: boolean;
};

export function RadioQuestion({
  selectedOption,
  onChangeSelectedOption,
  error,
  label,
  questions,
  name,
  subLabel,
  note,
  autoFocus = false,
}: Props) {
  const onChange = (value: string) => {
    onChangeSelectedOption(value);
  };

  return (
    <div>
      <RadioButtons
        legend={<Html as="p">{label}</Html>}
        hintText={subLabel}
        options={questions.map((question, index) => ({
          name,
          label: question.label,
          value: question.value,
          id: question.id,
          "data-testid": `${name} - ${question.label}`,
          nativeInputProps: {
            checked: selectedOption === question.value,
            onChange: () => onChange(question.value),
            autoFocus: autoFocus && index === 0,
          },
        }))}
        state={error ? "error" : "default"}
        stateRelatedMessage={error}
      />
      {note && <i>{note}</i>}
    </div>
  );
}
