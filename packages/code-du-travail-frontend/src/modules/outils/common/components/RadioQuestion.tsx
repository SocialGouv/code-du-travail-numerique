import React from "react";
import Html from "src/modules/common/Html";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { xssWrapper } from "src/modules/utils/xss";

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

  const errorId = `${name}-error`; // ID explicite pour le message d'erreur
  const hintId = `${name}-help`; // ID pour le message d'aide

  return (
    <div>
      <RadioButtons
        legend={<Html as="p">{label}</Html>}
        options={questions.map((question, index) => ({
          label: question.label,
          id: question.id,
          nativeInputProps: {
            checked: selectedOption === question.value,
            onChange: () => onChange(question.value),
            autoFocus: autoFocus && index === 0,
            required: true,
            "data-testid": `${name} - ${question.label}`,
            "aria-describedby": error
              ? errorId
              : subLabel
                ? `${name}-help`
                : undefined,
          },
        }))}
        state={error ? "error" : subLabel ? "info" : "default"}
        stateRelatedMessage={
          error ? (
            <span
              id={errorId}
              role="alert"
              dangerouslySetInnerHTML={{
                __html: xssWrapper(error),
              }}
            />
          ) : subLabel ? (
            <span
              id={hintId}
              dangerouslySetInnerHTML={{
                __html: xssWrapper(subLabel),
              }}
            />
          ) : undefined
        }
        aria-describedby={subLabel ? hintId : undefined}
      />
      {note && <i>{note}</i>}
    </div>
  );
}
