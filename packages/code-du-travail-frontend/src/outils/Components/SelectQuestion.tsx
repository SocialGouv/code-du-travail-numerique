import { Select, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";
import { InlineError } from "../common/ErrorField";
import { Question, Tooltip } from "../common/Question";
import { ErrorWrapper } from "./TextQuestion";

type Props = {
  name: string;
  label: string | JSX.Element;
  subLabel?: string;
  tooltip?: Tooltip;
  options: Record<string, string> | [string, string][];
  isTooltipOpen?: boolean;
  onSwitchTooltip?: () => void;
  showRequired?: boolean;
  error?: string;
  onChangeSelectedOption: (value: string) => void;
  selectedOption: string | undefined;
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
    <Wrapper>
      <Question
        required={showRequired}
        tooltip={tooltip}
        htmlFor={`input-${name}`}
        isTooltipOpen={isTooltipOpen}
        onSwitchTooltip={onSwitchTooltip}
      >
        {label}
      </Question>
      {subLabel && <SubLabel>{subLabel}</SubLabel>}
      <StyledSelect
        id={`input-${name}`}
        onChange={(v) => onChange(v.target.value)}
        value={value}
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
      </StyledSelect>
      {error && (
        <ErrorWrapper>
          <InlineError>{error}</InlineError>
        </ErrorWrapper>
      )}
    </Wrapper>
  );
};

export default SelectQuestion;

const { breakpoints, fonts, spacings } = theme;

const SubLabel = styled.label`
  display: block;
  margin-bottom: ${theme.spacings.tiny};
  font-size: ${fonts.sizes.default};
  cursor: ${(props) => (props.as ? "default" : "pointer")};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.small};
  }
`;

const StyledSelect = styled(Select)`
  width: 40rem;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  margin-bottom: ${spacings.base};
`;
