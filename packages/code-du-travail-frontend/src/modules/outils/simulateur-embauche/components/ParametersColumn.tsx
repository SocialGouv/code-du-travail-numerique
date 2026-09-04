"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import Select from "@codegouvfr/react-dsfr/SelectNext";
import { CONTRACT_OPTIONS, MEDIAN_SALARY_MONTHLY } from "../domain/constants";
import type { ContractType, SmicReference } from "../domain/types";
import { autofillButtons, parametersArea } from "../styles";

type Props = {
  contract: ContractType;
  onContractChange: (contract: ContractType) => void;
  smicReference: SmicReference | null;
  onFill: (amountMonthly: number, name: "salaire_median" | "smic") => void;
};

export const ParametersColumn = ({
  contract,
  onContractChange,
  smicReference,
  onFill,
}: Props) => (
  <div className={parametersArea}>
    <Select
      label="Type de contrat"
      options={CONTRACT_OPTIONS}
      nativeSelectProps={{
        value: contract,
        onChange: (event) =>
          onContractChange(event.target.value as ContractType),
      }}
    />

    <p className={fr.cx("fr-text--md", "fr-mb-2v", "fr-mt-4w")}>
      Remplir automatiquement
    </p>
    <div className={autofillButtons}>
      <Button
        priority="secondary"
        size="small"
        onClick={() => onFill(MEDIAN_SALARY_MONTHLY, "salaire_median")}
      >
        Salaire médian
      </Button>
      {/*
        Sans référence SMIC — préchargement serveur en échec — le bouton
        disparaît plutôt que d'injecter un montant inventé dans un simulateur de
        salaire.
      */}
      {smicReference && (
        <Button
          priority="secondary"
          size="small"
          onClick={() => onFill(smicReference.brutMensuel, "smic")}
        >
          SMIC
        </Button>
      )}
    </div>
  </div>
);
