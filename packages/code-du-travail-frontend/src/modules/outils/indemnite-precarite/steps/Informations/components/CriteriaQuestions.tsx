import React from "react";
import { SelectQuestion } from "src/modules/outils/common/components/SelectQuestion";
import { ContractType, CONTRACT_TYPE } from "../../../types";
import { CDDQuestions } from "./CDDQuestions";
import { CTTQuestions } from "./CTTQuestions";
import { InformationsStoreInput, InformationsStoreError } from "../store/types";
import { EXCLUDED_CONTRACTS } from "../store/validator";

interface Props {
  contractType: ContractType;
  criteria: Record<string, any>;
  input: InformationsStoreInput;
  onChange: (criteria: Record<string, any>) => void;
  onCDDQuestionChange: (questionKey: string, value: boolean) => void;
  onCTTQuestionChange: (questionKey: string, value: boolean) => void;
  errors: InformationsStoreError;
}

export const CriteriaQuestions: React.FC<Props> = ({
  contractType,
  criteria,
  input,
  onChange,
  onCDDQuestionChange,
  onCTTQuestionChange,
  errors,
}) => {
  const handleCriteriaChange = (key: string, value: any) => {
    const newCriteria = { ...criteria, [key]: value };
    onChange(newCriteria);
  };

  if (contractType === CONTRACT_TYPE.CDD) {
    // Toujours afficher la sélection du type de CDD
    const cddTypeOptions: [string, string][] = [
      ...EXCLUDED_CONTRACTS,
      "Autres",
    ].map((type) => [type, type]);

    return (
      <>
        <SelectQuestion
          name="cddType"
          label="Quel est le type de CDD ?"
          options={cddTypeOptions}
          selectedOption={criteria.cddType}
          onChangeSelectedOption={(value) =>
            handleCriteriaChange("cddType", value)
          }
          error={errors.criteria?.cddType}
        />

        {/* Questions spécifiques CDD si "Autres" est sélectionné */}
        {criteria.cddType === "Autres" && (
          <CDDQuestions
            input={input}
            onChange={onCDDQuestionChange}
            errors={errors}
          />
        )}
      </>
    );
  }

  if (contractType === CONTRACT_TYPE.CTT) {
    return (
      <CTTQuestions
        input={input}
        onChange={onCTTQuestionChange}
        errors={errors}
      />
    );
  }

  return null;
};
