import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { CheckboxesQuestion } from "src/modules/outils/common/components/CheckboxesQuestion";
import { CddConditionKey, InformationsStoreInput } from "../store/types";

interface Props {
  input: InformationsStoreInput;
  onChange: (key: CddConditionKey, checked: boolean) => void;
}

const CDD_CHECKBOX_OPTIONS: { key: CddConditionKey; label: string }[] = [
  {
    key: "finContratPeriodeDessai",
    label: "Le CDD a été rompu pendant la période d'essai du salarié.",
  },
  {
    key: "propositionCDIFindeContrat",
    label:
      "À la fin du CDD, le salarié a été immédiatement embauché en CDI, sans interruption, sur un même poste ou sur un poste différent.",
  },
  {
    key: "refusCDIFindeContrat",
    label:
      "À la fin du CDD, le salarié a refusé un CDI pour occuper le même emploi ou un emploi similaire dans l'entreprise avec une rémunération au moins équivalente.",
  },
  {
    key: "interruptionFauteGrave",
    label:
      "Le CDD a été rompu avant la fin prévue à la propre initiative du salarié, pour faute grave, pour faute lourde ou en cas de force majeure.",
  },
  {
    key: "refusRenouvellementAuto",
    label:
      "Le salarié a refusé de renouveler le CDD alors que le renouvellement et ses modalités étaient prévus dès l'origine dans son contrat.",
  },
];

export const CDDQuestions: React.FC<Props> = ({ input, onChange }) => {
  const values: Partial<Record<CddConditionKey, boolean>> = {
    finContratPeriodeDessai: input.finContratPeriodeDessai,
    propositionCDIFindeContrat: input.propositionCDIFindeContrat,
    refusCDIFindeContrat: input.refusCDIFindeContrat,
    interruptionFauteGrave: input.interruptionFauteGrave,
    refusRenouvellementAuto: input.refusRenouvellementAuto,
  };

  return (
    <div className={fr.cx("fr-mb-3w")}>
      <CheckboxesQuestion<CddConditionKey>
        name="cddQuestions"
        legend="Cochez la ou les situations qui s'appliquent à votre contrat :"
        options={CDD_CHECKBOX_OPTIONS}
        values={values}
        onChange={onChange}
      />
    </div>
  );
};
