import React from "react";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { ContractType, CONTRACT_TYPE } from "../../../types";

interface Props {
  value?: ContractType;
  onChange: (contractType: ContractType) => void;
  error?: string;
}

export const ContractTypeQuestion: React.FC<Props> = ({
  value,
  onChange,
  error,
}) => {
  const handleChange = (newValue: string) => {
    onChange(newValue as ContractType);
  };

  return (
    <RadioButtons
      legend="Quel est le type du contrat de travail ?"
      name="contractType"
      options={[
        {
          label: "Contrat à durée déterminée (CDD)",
          nativeInputProps: {
            value: CONTRACT_TYPE.CDD,
            checked: value === CONTRACT_TYPE.CDD,
            onChange: () => handleChange(CONTRACT_TYPE.CDD),
          },
        },
        {
          label: "Contrat de travail temporaire (Contrat d'intérim)",
          nativeInputProps: {
            value: CONTRACT_TYPE.CTT,
            checked: value === CONTRACT_TYPE.CTT,
            onChange: () => handleChange(CONTRACT_TYPE.CTT),
          },
        },
      ]}
      state={error ? "error" : "default"}
      stateRelatedMessage={error}
      orientation="vertical"
    />
  );
};
