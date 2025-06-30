import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { InformationsStoreInput, InformationsStoreError } from "../store/types";

interface Props {
  input: InformationsStoreInput;
  onChange: (key: string, value: boolean) => void;
  errors: InformationsStoreError;
}

export const CTTQuestions: React.FC<Props> = ({ input, onChange, errors }) => {
  return (
    <>
      {/* Question sur le contrat de mission-formation */}
      <div className={fr.cx("fr-mb-3w")}>
        <RadioButtons
          legend="S'agit-il d'un contrat de mission-formation ?"
          name="cttFormation"
          options={[
            {
              label: "Oui",
              nativeInputProps: {
                value: "true",
                checked: input.cttFormation === true,
                onChange: () => onChange("cttFormation", true),
              },
            },
            {
              label: "Non",
              nativeInputProps: {
                value: "false",
                checked: input.cttFormation === false,
                onChange: () => onChange("cttFormation", false),
              },
            },
          ]}
          state={errors.cttFormation ? "error" : "default"}
          stateRelatedMessage={errors.cttFormation}
          orientation="horizontal"
        />
      </div>

      {/* Alerte pour les contrats saisonniers ou d'usage */}
      {input.cttFormation === false && (
        <Alert
          severity="warning"
          title="Attention"
          description="S'il s'agit d'un contrat de travail temporaire saisonnier ou d'usage, un accord d'entreprise ou d'établissement peut dispenser l'entreprise de travail temporaire (l'entreprise d'intérim) de verser la prime de précarité."
          className={fr.cx("fr-mb-3w")}
        />
      )}

      {/* Question sur la rupture pour faute grave */}
      <div className={fr.cx("fr-mb-3w")}>
        <RadioButtons
          legend="Le contrat d'intérim a-t-il été rompu avant la fin prévue pour une des raisons suivantes : la propre initiative du salarié, la faute grave du salarié, cas de force majeure ?"
          name="ruptureContratFauteGrave"
          options={[
            {
              label: "Oui",
              nativeInputProps: {
                value: "true",
                checked: input.ruptureContratFauteGrave === true,
                onChange: () => onChange("ruptureContratFauteGrave", true),
              },
            },
            {
              label: "Non",
              nativeInputProps: {
                value: "false",
                checked: input.ruptureContratFauteGrave === false,
                onChange: () => onChange("ruptureContratFauteGrave", false),
              },
            },
          ]}
          state={errors.ruptureContratFauteGrave ? "error" : "default"}
          stateRelatedMessage={errors.ruptureContratFauteGrave}
          orientation="horizontal"
        />
      </div>

      {/* Question sur l'embauche en CDI */}
      <div className={fr.cx("fr-mb-3w")}>
        <RadioButtons
          legend="À la fin du contrat d'intérim, le salarié a-t-il été immédiatement embauché en CDI au sein de l'entreprise dans laquelle il effectuait sa mission ?"
          name="propositionCDIFinContrat"
          options={[
            {
              label: "Oui",
              nativeInputProps: {
                value: "true",
                checked: input.propositionCDIFinContrat === true,
                onChange: () => onChange("propositionCDIFinContrat", true),
              },
            },
            {
              label: "Non",
              nativeInputProps: {
                value: "false",
                checked: input.propositionCDIFinContrat === false,
                onChange: () => onChange("propositionCDIFinContrat", false),
              },
            },
          ]}
          state={errors.propositionCDIFinContrat ? "error" : "default"}
          stateRelatedMessage={errors.propositionCDIFinContrat}
          orientation="horizontal"
        />
      </div>

      {/* Question sur le refus de souplesse */}
      <div className={fr.cx("fr-mb-3w")}>
        <RadioButtons
          legend="Le salarié a-t-il refusé la mise en œuvre de la souplesse prévue dans le contrat d'intérim ?"
          name="refusSouplesse"
          options={[
            {
              label: "Oui",
              nativeInputProps: {
                value: "true",
                checked: input.refusSouplesse === true,
                onChange: () => onChange("refusSouplesse", true),
              },
            },
            {
              label: "Non",
              nativeInputProps: {
                value: "false",
                checked: input.refusSouplesse === false,
                onChange: () => onChange("refusSouplesse", false),
              },
            },
          ]}
          state={errors.refusSouplesse ? "error" : "default"}
          stateRelatedMessage={errors.refusSouplesse}
          orientation="horizontal"
        />
      </div>
    </>
  );
};
