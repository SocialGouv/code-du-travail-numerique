import React from "react";
import Html from "src/modules/common/Html";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { xssWrapper } from "src/lib";
import { css } from "@styled-system/css";
import { DEFAULT_MIN_INPUT_SIZE } from "src/modules/config/size";

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
}: Props): JSX.Element => {
  const [optionsArray, setOptionsArray] = React.useState<[string, string][]>(
    []
  );

  React.useEffect(() => {
    if (!Array.isArray(options)) {
      setOptionsArray(Object.entries(options));
    } else {
      setOptionsArray(options);
    }
  }, [options]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeSelectedOption(event.target.value);
  };

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
        } as any
      }
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
      className={inputStyle}
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

const inputStyle = css({
  "&>select": { maxWidth: `${DEFAULT_MIN_INPUT_SIZE}!` },
});
