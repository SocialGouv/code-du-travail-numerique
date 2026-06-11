import React, { useEffect, useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { SalaryEntry } from "../store/types";
import { defaultInputStyle } from "src/modules/outils/common/styles/input";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { css } from "@styled-system/css";

interface Props {
  salaires: SalaryEntry[];
  dureeContrat?: number;
  onSalairesChange: (salaires: SalaryEntry[]) => void;
  onDureeContratChange: (duree: number) => void;
  error?: string;
  dureeError?: string;
  visible?: boolean;
}

const dureeInputStyle = css({
  width: "fit-content!",
  minWidth: `282px!`,
});

export const SalairesMensuels: React.FC<Props> = ({
  salaires,
  dureeContrat,
  onSalairesChange,
  onDureeContratChange,
  error,
  dureeError,
  visible = true,
}) => {
  const [dureeInputValue, setDureeInputValue] = useState<string>(
    dureeContrat?.toString() ?? ""
  );

  useEffect(() => {
    setDureeInputValue(dureeContrat?.toString() ?? "");
  }, [dureeContrat]);

  const handleSalaireChange = (index: number, value: string) => {
    const numericValue = parseFloat(value) || null;
    const newSalaires = [...salaires];
    newSalaires[index] = { salaire: numericValue };
    onSalairesChange(newSalaires);
  };

  const handleDureeChange = (value: string) => {
    setDureeInputValue(value);
    const numericValue = parseInt(value, 10);
    if (!Number.isNaN(numericValue) && numericValue >= 1) {
      onDureeContratChange(numericValue);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={fr.cx("fr-mb-3w")}>
      {error && (
        <AccessibleAlert
          title="Attention"
          description={error}
          severity="error"
          className={["fr-mb-2w"]}
        />
      )}

      <Input
        label="Durée du contrat en mois"
        nativeInputProps={
          {
            type: "number",
            min: "1",
            step: "1",
            value: dureeInputValue,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              handleDureeChange(e.target.value),
            onWheel: (e: React.WheelEvent<HTMLInputElement>) =>
              e.currentTarget.blur(),
            "data-testid": "dureeContrat",
          } as any
        }
        state={dureeError ? "error" : "default"}
        stateRelatedMessage={dureeError}
        classes={{
          nativeInputOrTextArea: dureeInputStyle,
        }}
      />

      {salaires.map((salaire, index) => (
        <Input
          key={index}
          label={`Montant brut, mois ${index + 1}`}
          nativeInputProps={
            {
              type: "number",
              min: "0",
              step: "100",
              value: salaire.salaire ?? "",
              onChange: (e) => handleSalaireChange(index, e.target.value),
              onWheel: (e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur(),
              "data-testid": `salaireMensuel-${index + 1}`,
            } as any
          }
          classes={{
            nativeInputOrTextArea: defaultInputStyle,
          }}
        />
      ))}

      <p className={fr.cx("fr-text--light", "fr-text--sm")}>
        Majorations, indemnités, primes et accessoires compris sauf les
        remboursements de frais et l&apos;indemnité compensatrice de congés
        payés.
      </p>
    </div>
  );
};
