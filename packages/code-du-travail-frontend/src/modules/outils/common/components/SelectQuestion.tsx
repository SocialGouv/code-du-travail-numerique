import React, { useEffect, useRef } from "react";
import Html from "src/modules/common/Html";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { defaultSelectStyle } from "src/modules/outils/common/styles/select";
import { xssWrapper } from "src/modules/utils/xss";

type Props = {
  name: string;
  label: string;
  subLabel?: string;
  options: Record<string, string> | [string, string][];
  error?: string;
  onChangeSelectedOption: (value: string) => void;
  selectedOption: string | undefined;
  autoFocus?: boolean;
};

export const SelectQuestion = ({
  name,
  label,
  subLabel,
  options,
  error,
  onChangeSelectedOption,
  selectedOption,
  autoFocus = false,
}: Props) => {
  const [optionsArray, setOptionsArray] = React.useState<[string, string][]>(
    []
  );
  const selectRef = useRef<HTMLSelectElement>(null);

  React.useEffect(() => {
    if (!Array.isArray(options)) {
      setOptionsArray(Object.entries(options));
    } else {
      setOptionsArray(options);
    }
  }, [options]);

  useEffect(() => {
    if (error && selectRef.current) {
      selectRef.current.focus();
      selectRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error]);

  useEffect(() => {
    if (autoFocus && selectRef.current) {
      selectRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeSelectedOption(event.target.value);
  };

  const errorId = `${name}-error`;
  const hintId = `${name}-help`;

  return (
    <Select
      label={<Html as="span">{label}</Html>}
      nativeSelectProps={
        {
          onChange: handleChange,
          value: selectedOption ?? "",
          id: `input-${name}`,
          autoFocus,
          required: true,
          "data-testid": name,
          ref: selectRef,
        } as any
      }
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
        ) : (
          subLabel && (
            <span
              id={hintId}
              dangerouslySetInnerHTML={{
                __html: xssWrapper(subLabel),
              }}
            />
          )
        )
      }
      className={defaultSelectStyle}
    >
      <option value="" disabled>
        Sélectionnez une option
      </option>
      {optionsArray.map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </Select>
  );
};
