import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { SalaryEntry } from "../store/types";

interface Props {
  salaires: SalaryEntry[];
  onChange: (salaires: SalaryEntry[]) => void;
  error?: string;
  visible?: boolean;
}

export const SalairesMensuels: React.FC<Props> = ({
  salaires,
  onChange,
  error,
  visible = true,
}) => {
  const handleSalaireChange = (index: number, value: string) => {
    const numericValue = parseFloat(value) || null;
    const newSalaires = [...salaires];
    newSalaires[index] = { salaire: numericValue };
    onChange(newSalaires);
  };

  const addSalaire = () => {
    onChange([...salaires, { salaire: null }]);
  };

  const removeSalaire = (index: number) => {
    const newSalaires = salaires.filter((_, i) => i !== index);
    onChange(newSalaires);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={fr.cx("fr-mb-3w")}>
      <h4 className={fr.cx("fr-h6", "fr-mb-2w")}>
        Quels sont les salaires mensuels bruts perçus durant le contrat de
        travail ?
      </h4>

      {error && (
        <div className={fr.cx("fr-alert", "fr-alert--error", "fr-mb-2w")}>
          <p>{error}</p>
        </div>
      )}

      {salaires.map((salaire, index) => (
        <div key={index} className={fr.cx("fr-mb-2w")}>
          <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
            <div className={fr.cx("fr-col-12", "fr-col-md-8")}>
              <Input
                label={`Montant ${index + 1} en €`}
                nativeInputProps={{
                  type: "number",
                  min: "0",
                  step: "100",
                  value: salaire.salaire || "",
                  onChange: (e) => handleSalaireChange(index, e.target.value),
                }}
              />
            </div>
            <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
              <Button
                priority="secondary"
                size="small"
                iconId="fr-icon-delete-line"
                onClick={() => removeSalaire(index)}
                disabled={salaires.length <= 1}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button
        priority="secondary"
        size="small"
        iconId="fr-icon-add-line"
        onClick={addSalaire}
        className={fr.cx("fr-mb-2w")}
      >
        Ajouter un salaire
      </Button>

      <p className={fr.cx("fr-text--light", "fr-text--sm")}>
        Majorations, indemnités, primes et accessoires compris sauf les
        remboursements de frais et l&apos;indemnité de congés payés.
      </p>
    </div>
  );
};
