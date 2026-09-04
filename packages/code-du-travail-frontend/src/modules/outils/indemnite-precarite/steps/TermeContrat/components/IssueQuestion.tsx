import React from "react";
import { RadioQuestion } from "src/modules/outils/common/components/RadioQuestion";
import { IssueContrat } from "../../../types";
import { IssueOption } from "../issues";

type Props = {
  label: string;
  options: IssueOption[];
  value?: IssueContrat;
  onChange: (value: IssueContrat) => void;
  error?: string;
};

export const IssueQuestion: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
  error,
}) => (
  <RadioQuestion
    name="issueContrat"
    label={label}
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
