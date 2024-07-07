import React, { FunctionComponent, useEffect, useState } from "react";
import Html from "../../common/Html";
import { Tooltip } from "../common/Question";
import { Input } from "@codegouvfr/react-dsfr/Input";

type Props = {
  onChange: (value: string) => void;
  error?: string;
  label: string;
  tooltip?: Tooltip;
  inputType?: "date" | "number" | "text";
  value: string | number | undefined;
  placeholder?: string;
  subLabel?: string;
  smallText?: string;
  title?: string;
  showRequired?: boolean;
  icon?: FunctionComponent;
  id: string;
  dataTestId?: string;
  text?: string;
  autoFocus?: boolean;
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
  title,
  showRequired,
  icon,
  id,
  dataTestId,
  text,
  autoFocus = false,
}: Props) {
  const [inputRef, setInputRef] = useState<HTMLInputElement>();
  useEffect(() => {
    if (inputRef && error) {
      inputRef?.focus();
    }
  }, [inputRef, error]);
  return (
    <Input
      hintText={subLabel}
      label={<Html as="span">{label}</Html>}
      state={error ? "error" : "default"}
      stateRelatedMessage={error}
      nativeInputProps={{
        type: inputType === "date" ? "date" : "text",
        required: showRequired,
        onChange(e) {
          console.log("OnChange: ", e);
          onChange(e.target.value);
        },
      }}
    />
  );
}

/*
<Wrapper>
      <Question required={showRequired} tooltip={tooltip} htmlFor={id}>
        <Html as="span">{label}</Html>
      </Question>
      {smallText && <SmallText>{smallText}</SmallText>}
      {subLabel && <SubLabel>{subLabel}</SubLabel>}
      <QuestionWrapper
        ref={(elem) => {
          if (elem) {
            setInputRef(elem.children[0].children[0]);
          }
        }}
      >
        <InputComponent
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(inputType === "date" ? e : e.target.value)}
          invalid={!!error}
          placeholder={placeholder}
          icon={icon}
          text={text}
          type={inputType === "date" ? "text" : inputType}
          updateOnScrollDisabled
          data-testid={dataTestId}
          autoFocus={autoFocus}
          title={title}
        />
      </QuestionWrapper>
      {error && (
        <Error>
          <span
            dangerouslySetInnerHTML={{
              __html: xssWrapper(error),
            }}
          />
        </Error>
      )}
    </Wrapper>
 */
