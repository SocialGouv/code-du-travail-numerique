import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { defaultInputStyle } from "src/modules/outils/common/styles/input";

interface Props {
  value?: number;
  onChange: (value: number) => void;
  error?: string;
}

export const SalaireTotal: React.FC<Props> = ({ value, onChange, error }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseFloat(event.target.value) || 0;
    onChange(numericValue);
  };

  return (
    <div className={fr.cx("fr-mb-3w")}>
      <Input
        label="Quelle est la rémunération totale brute perçue en € durant le contrat de travail ?"
        nativeInputProps={
          {
            type: "number",
            min: "0",
            step: "1000",
            value: value || "",
            onChange: handleChange,
            "data-testid": "salaireTotal",
          } as any
        }
        state={error ? "error" : "default"}
        stateRelatedMessage={error}
        classes={{
          nativeInputOrTextArea: defaultInputStyle,
        }}
      />
      <p className={fr.cx("fr-text--light", "fr-mt-1w", "fr-text--sm")}>
        Majorations, indemnités, primes et accessoires compris sauf les
        remboursements de frais et l&apos;indemnité de congés payés.
      </p>
    </div>
  );
};
