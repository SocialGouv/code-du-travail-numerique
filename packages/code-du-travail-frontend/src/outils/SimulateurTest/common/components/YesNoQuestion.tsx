import { InputRadio } from "@socialgouv/cdtn-ui";
import React from "react";

import { Question, Tooltip } from "../../../common/Question";
import { RadioContainer } from "../../../common/stepStyles";

type Props = {
  label: string | JSX.Element;
  tooltip?: Tooltip;
  onChangeYes: () => void;
  onChangeNo: () => void;
  isYesChecked: boolean;
  isNoChecked: boolean;
};

export const YesNoQuestion = ({
  label,
  tooltip,
  onChangeYes,
  onChangeNo,
  isYesChecked,
  isNoChecked,
}: Props): JSX.Element => {
  return (
    <>
      <Question tooltip={tooltip} required>
        {label}
      </Question>
      <RadioContainer>
        <InputRadio
          label="Oui"
          onChange={onChangeYes}
          id={`oui-radio-${label}`}
          name={`${label}-radio`}
          checked={isYesChecked}
        />
        <InputRadio
          label="Non"
          id={`non-radio-${label}`}
          onChange={onChangeNo}
          name={`${label}-radio`}
          checked={isNoChecked}
        />
      </RadioContainer>
    </>
  );
};
