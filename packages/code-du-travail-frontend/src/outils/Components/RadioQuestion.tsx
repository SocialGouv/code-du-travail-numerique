import { InputRadio } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { InlineError } from "../common/ErrorField";
import { Question, Tooltip } from "../common/Question";
import { RadioContainer } from "../common/stepStyles";

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
}: Props) {
  const onChange = (value: string) => {
    onChangeSelectedOption(value);
  };

  return (
    <>
      <Question required={showRequired} tooltip={tooltip}>
        {label}
      </Question>
      <RadioContainer>
        {questions.map((question, index) => (
          <InputRadio
            key={index}
            name={name}
            label={question.label}
            value={question.value}
            id={question.id}
            checked={selectedOption === question.value}
            onChange={() => onChange(question.value)}
          />
        ))}
        {error && (
          <ErrorWrapper>
            <InlineError>{error}</InlineError>
          </ErrorWrapper>
        )}
      </RadioContainer>
    </>
  );
}

export const ErrorWrapper = styled.div`
  display: flex;
`;
