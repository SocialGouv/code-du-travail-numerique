import React from "react";
import { RadioQuestion } from "src/modules/outils/common/components/RadioQuestion";
import { FinALaDatePrevue } from "../../../types";

type Props = {
  contractLabel: string;
  value?: FinALaDatePrevue;
  onChange: (value: FinALaDatePrevue) => void;
  error?: string;
};

export const TermeQuestion: React.FC<Props> = ({
  contractLabel,
  value,
  onChange,
  error,
}) => (
  <RadioQuestion
    name="finALaDatePrevue"
    label={`Le <strong>${contractLabel}</strong> a-t-il pris fin à la date initialement prévue (pas de rupture anticipée)&nbsp;?`}
    questions={[
      {
        label: "Oui",
        value: "oui",
        id: "finALaDatePrevue-oui",
        testId: "finALaDatePrevue-oui",
      },
      {
        label: "Non",
        value: "non",
        id: "finALaDatePrevue-non",
        testId: "finALaDatePrevue-non",
      },
    ]}
    selectedOption={value}
    onChangeSelectedOption={(selected) =>
      onChange(selected as FinALaDatePrevue)
    }
    error={error}
  />
);
