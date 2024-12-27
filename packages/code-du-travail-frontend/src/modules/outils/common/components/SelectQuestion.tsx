import React from "react";
import { Tooltip } from "./types";
import Html from "src/modules/common/Html";

type Props = {
  name: string;
  label: string;
  subLabel?: string;
  tooltip?: Tooltip;
  options: Record<string, string> | [string, string][];
  isTooltipOpen?: boolean;
  onSwitchTooltip?: () => void;
  showRequired?: boolean;
  error?: string;
  onChangeSelectedOption: (value: string) => void;
  selectedOption: string | undefined;
  autoFocus?: boolean;
};

const SelectQuestion = ({
  name,
  label,
  subLabel,
  tooltip,
  options,
  isTooltipOpen,
  onSwitchTooltip,
  error,
  showRequired,
  onChangeSelectedOption,
  selectedOption,
  autoFocus = false,
}: Props): JSX.Element => {
  const [optionsArray, setOptionsArray] = React.useState<[string, string][]>(
    []
  );
  const [value, setValue] = React.useState(selectedOption ?? "");
  const onChange = (value: string) => {
    setValue(value);
    onChangeSelectedOption(value);
  };

  React.useEffect(() => {
    if (!Array.isArray(options)) {
      setOptionsArray(Object.entries(options));
    } else {
      setOptionsArray(options);
    }
  }, [options]);

  return (
    <div>
      <div
      // required={showRequired}
      // tooltip={tooltip}
      // htmlFor={`input-${name}`}
      // isTooltipOpen={isTooltipOpen}
      // onSwitchTooltip={onSwitchTooltip}
      >
        <Html as="span">{label}</Html>
      </div>
      {subLabel && <p>{subLabel}</p>}
      <select
        id={`input-${name}`}
        onChange={(v) => onChange(v.target.value)}
        value={value}
        data-testid={name}
        autoFocus={autoFocus}
      >
        <option disabled value="">
          ...
        </option>
        {optionsArray.map((option) => {
          let key, label;
          if (Array.isArray(option)) {
            [key, label] = option;
          } else {
            key = label = option;
          }

          return (
            <option value={key} key={key}>
              {label}
            </option>
          );
        })}
      </select>
      {error && <div>{error}</div>}
    </div>
  );
};

export default SelectQuestion;
