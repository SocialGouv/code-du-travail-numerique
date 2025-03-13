import React from "react";
import Html from "src/modules/common/Html";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { xssWrapper } from "src/lib";

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
        options={questions.map((question, index) => ({
          name,
          label: question.label,
          value: question.value,
          id: question.id,
          nativeInputProps: {
            checked: selectedOption === question.value,
            onChange: () => onChange(question.value),
            autoFocus: autoFocus && index === 0,
            required: true,
            "data-testid": `${name} - ${question.label}`,
          },
        }))}
        state={error ? "error" : subLabel ? "info" : "default"}
        stateRelatedMessage={
          error ? (
            <span
              dangerouslySetInnerHTML={{
                __html: xssWrapper(error),
              }}
            />
          ) : (
            subLabel && (
              <span
                dangerouslySetInnerHTML={{
                  __html: xssWrapper(subLabel),
                }}
              />
            )
          )
        }
      />
      {note && <i>{note}</i>}
    </div>
  );
}
