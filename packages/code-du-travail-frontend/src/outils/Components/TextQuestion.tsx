import { Input, InputDate, theme } from "@socialgouv/cdtn-ui";
import React, { FunctionComponent } from "react";

import styled from "styled-components";
import xss from "xss";
import Html from "../../common/Html";
import { InlineError } from "../common/ErrorField";
import { Tooltip, Question } from "../common/Question";
import { SmallText } from "../common/stepStyles";
import { SubLabel } from "./SelectQuestion";

type Props = {
  onChange: (value: string) => void;
  error?: string;
  label: string;
  tooltip?: Tooltip;
  inputType?: "date" | "number" | "text";
  value: string | undefined;
  placeholder?: string;
  subLabel?: string;
  smallText?: string;
  showRequired?: boolean;
  icon?: FunctionComponent;
  id: string;
};

export default function TextQuestion({
  tooltip,
  inputType,
  label,
  error,
  value,
  placeholder,
  onChange,
  smallText,
  subLabel,
  showRequired,
  icon,
  id,
}: Props) {
  const InputComponent = inputType === "date" ? InputDate : Input;
  return (
    <Wrapper>
      <Question required={showRequired} tooltip={tooltip} htmlFor={id}>
        <Html as="span">{label}</Html>
      </Question>
      {smallText && <SmallText>{smallText}</SmallText>}
      {subLabel && <SubLabel>{subLabel}</SubLabel>}
      <QuestionWrapper>
        <InputComponent
          id={id}
          value={value}
          onChange={(e) => onChange(inputType === "date" ? e : e.target.value)}
          invalid={error}
          placeholder={placeholder}
          icon={icon}
          type={inputType === "date" ? "text" : inputType}
          updateOnScrollDisabled
        />
      </QuestionWrapper>
      {error && (
        <ErrorWrapper>
          <InlineError>
            <div
              dangerouslySetInnerHTML={{
                __html: xss(error),
              }}
            />
          </InlineError>
        </ErrorWrapper>
      )}
    </Wrapper>
  );
}

const { spacings } = theme;

const Wrapper = styled.div`
  margin-bottom: ${spacings.base};
`;

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ErrorWrapper = styled.div`
  display: flex;
`;
