import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { CheckboxesQuestion } from "src/modules/outils/common/components/CheckboxesQuestion";
import { CttConditionKey, InformationsStoreInput } from "../store/types";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";

interface Props {
  input: InformationsStoreInput;
  onChange: (key: CttConditionKey, checked: boolean) => void;
}

const CTT_CHECKBOX_OPTIONS: { key: CttConditionKey; label: string }[] = [
  {
    key: "cttFormation",
    label: "Il s'agit d'un contrat de mission-formation.",
  },
  {
    key: "ruptureContratFauteGrave",
    label:
      "Le contrat d'intérim a été rompu avant la fin prévue à la propre initiative du salarié, pour faute grave du salarié ou en cas de force majeure.",
  },
  {
    key: "propositionCDIFinContrat",
    label:
      "À la fin du contrat d'intérim, le salarié a été immédiatement embauché en CDI au sein de l'entreprise dans laquelle il effectuait sa mission.",
  },
  {
    key: "refusSouplesse",
    label:
      "Le salarié a refusé la mise en œuvre de la souplesse prévue dans le contrat d'intérim.",
  },
];

export const CTTQuestions: React.FC<Props> = ({ input, onChange }) => {
  const values: Partial<Record<CttConditionKey, boolean>> = {
    cttFormation: input.cttFormation,
    ruptureContratFauteGrave: input.ruptureContratFauteGrave,
    propositionCDIFinContrat: input.propositionCDIFinContrat,
    refusSouplesse: input.refusSouplesse,
  };

  return (
    <>
      <div className={fr.cx("fr-mb-3w")}>
        <CheckboxesQuestion<CttConditionKey>
          name="cttQuestions"
          legend="Cochez la ou les situations qui s'appliquent à votre contrat :"
          options={CTT_CHECKBOX_OPTIONS}
          values={values}
          onChange={onChange}
        />
      </div>

      <AccessibleAlert
        severity="warning"
        title="Attention"
        description="S'il s'agit d'un contrat de travail temporaire saisonnier ou d'usage, un accord d'entreprise ou d'établissement peut dispenser l'entreprise de travail temporaire (l'entreprise d'intérim) de verser la prime de précarité."
        className={["fr-mb-3w"]}
      />
    </>
  );
};
