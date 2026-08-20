import React from "react";
import { RadioQuestion } from "src/modules/outils/common/components/RadioQuestion";
import { IssueContrat } from "../../../types";
import { IssueOption } from "../issues";

type Props = {
  contractLabel: string;
  options: IssueOption[];
  value?: IssueContrat;
  onChange: (value: IssueContrat) => void;
  error?: string;
};

export const IssueQuestion: React.FC<Props> = ({
  contractLabel,
  options,
  value,
  onChange,
  error,
}) => (
  <RadioQuestion
    name="issueContrat"
    label={`Quelle a été l'issue du <strong>${contractLabel}</strong>&nbsp;?`}
    questions={options.map((option) => ({
      label: option.label,
      value: option.value,
      id: `issueContrat-${option.value}`,
      testId: `issueContrat-${option.value}`,
      hint: option.hint,
    }))}
    selectedOption={value}
    onChangeSelectedOption={(selected) => onChange(selected as IssueContrat)}
    error={error}
  />
);
