import React from "react";
import { RadioQuestion } from "src/modules/outils/common/components/RadioQuestion";
import { ContractOption } from "../../../types";

type Props = {
  options: ContractOption[];
  value?: string;
  onChange: (contractOptionId: string) => void;
  error?: string;
};

export const ContractTypeQuestion: React.FC<Props> = ({
  options,
  value,
  onChange,
  error,
}) => (
  <RadioQuestion
    name="contractType"
    label="Quel est le type du contrat de travail&nbsp;?"
    questions={options.map((option) => ({
      label: option.label,
      value: option.id,
      id: `contractType-${option.id}`,
      testId: `contractType-${option.id}`,
      hint: option.hint,
    }))}
    selectedOption={value}
    onChangeSelectedOption={(selected) => onChange(selected as string)}
    error={error}
  />
);
