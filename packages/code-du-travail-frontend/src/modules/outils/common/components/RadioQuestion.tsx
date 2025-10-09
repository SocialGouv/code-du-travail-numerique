import React, { useEffect, useRef } from "react";
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
  const radioRefs = useRef<(HTMLInputElement | null)[]>([]);

  const onChange = (value: string, index: number) => {
    onChangeSelectedOption(value);
    // Keep focus on the selected radio button
    setTimeout(() => {
      if (radioRefs.current[index]) {
        radioRefs.current[index]?.focus();
      }
    }, 0);
  };

  const errorId = `${name}-error`;
  const hintId = `${name}-help`;

  useEffect(() => {
    if (error && radioRefs.current[0]) {
      radioRefs.current[0].focus();
      radioRefs.current[0].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error]);

  useEffect(() => {
    if (autoFocus && radioRefs.current[0]) {
      radioRefs.current[0].focus();
    }
  }, [autoFocus]);

  return (
    <div>
      <RadioButtons
        legend={<Html as="p">{label}</Html>}
        options={questions.map((question, index) => ({
          label: question.label,
          id: question.id,
          nativeInputProps: {
            checked: selectedOption === question.value,
            onChange: () => onChange(question.value, index),
            autoFocus: autoFocus && index === 0,
            required: true,
            "data-testid": `${name}-${question.label}`,
            ref: (el: HTMLInputElement | null) => {
              radioRefs.current[index] = el;
            },
          },
        }))}
        state={error ? "error" : subLabel ? "info" : "default"}
        aria-describedby={error ? errorId : subLabel ? hintId : undefined}
        stateRelatedMessage={
          error ? (
            <span
              id={errorId}
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
      />
      {note && <i>{note}</i>}
    </div>
  );
}
