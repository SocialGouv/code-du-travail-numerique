import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { InformationsStoreInput, InformationsStoreError } from "../store/types";

interface Props {
  input: InformationsStoreInput;
  onChange: (key: string, value: boolean) => void;
  errors: InformationsStoreError;
}

export const CDDQuestions: React.FC<Props> = ({ input, onChange, errors }) => {
  return (
    <div className={fr.cx("fr-mb-3w")}>
      {/* Question sur la période d'essai */}
      <div className={fr.cx("fr-mb-3w")}>
        <RadioButtons
          legend="Le CDD a-t-il été rompu pendant la période d'essai du salarié ?"
          name="finContratPeriodeDessai"
          options={[
            {
              label: "Oui",
              nativeInputProps: {
                value: "true",
                checked: input.finContratPeriodeDessai === true,
                onChange: () => onChange("finContratPeriodeDessai", true),
                "data-testid": "finContratPeriodeDessai-Oui",
              } as any,
            },
            {
              label: "Non",
              nativeInputProps: {
                value: "false",
                checked: input.finContratPeriodeDessai === false,
                onChange: () => onChange("finContratPeriodeDessai", false),
                "data-testid": "finContratPeriodeDessai-Non",
              } as any,
            },
          ]}
          state={errors.finContratPeriodeDessai ? "error" : "default"}
          stateRelatedMessage={errors.finContratPeriodeDessai}
          orientation="horizontal"
        />
      </div>

      {/* Question sur l'embauche en CDI */}
      <div className={fr.cx("fr-mb-3w")}>
        <RadioButtons
          legend="À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI, sans interruption, sur un même poste ou sur un poste différent ?"
          name="propositionCDIFindeContrat"
          options={[
            {
              label: "Oui",
              nativeInputProps: {
                value: "true",
                checked: input.propositionCDIFindeContrat === true,
                onChange: () => onChange("propositionCDIFindeContrat", true),
                "data-testid": "propositionCDIFindeContrat-Oui",
              } as any,
            },
            {
              label: "Non",
              nativeInputProps: {
                value: "false",
                checked: input.propositionCDIFindeContrat === false,
                onChange: () => onChange("propositionCDIFindeContrat", false),
                "data-testid": "propositionCDIFindeContrat-Non",
              } as any,
            },
          ]}
          state={errors.propositionCDIFindeContrat ? "error" : "default"}
          stateRelatedMessage={errors.propositionCDIFindeContrat}
          orientation="horizontal"
        />
      </div>

      {/* Question conditionnelle sur le refus de CDI */}
      {input.propositionCDIFindeContrat === false && (
        <div className={fr.cx("fr-mb-3w")}>
          <RadioButtons
            legend="À la fin du CDD, le salarié a-t-il refusé un CDI pour occuper le même emploi ou un emploi similaire dans l'entreprise avec une rémunération au moins équivalente ?"
            name="refusCDIFindeContrat"
            options={[
              {
                label: "Oui",
                nativeInputProps: {
                  value: "true",
                  checked: input.refusCDIFindeContrat === true,
                  onChange: () => onChange("refusCDIFindeContrat", true),
                  "data-testid": "refusCDIFindeContrat-Oui",
                } as any,
              },
              {
                label: "Non",
                nativeInputProps: {
                  value: "false",
                  checked: input.refusCDIFindeContrat === false,
                  onChange: () => onChange("refusCDIFindeContrat", false),
                  "data-testid": "refusCDIFindeContrat-Non",
                } as any,
              },
            ]}
            state={errors.refusCDIFindeContrat ? "error" : "default"}
            stateRelatedMessage={errors.refusCDIFindeContrat}
            orientation="horizontal"
          />
        </div>
      )}

      {/* Question sur l'interruption pour faute grave */}
      <div className={fr.cx("fr-mb-3w")}>
        <RadioButtons
          legend="Le CDD a-t-il été rompu avant la fin prévue pour une des raisons suivantes : la propre initiative du salarié, la faute grave ou faute lourde du salarié, cas de force majeure ?"
          name="interruptionFauteGrave"
          options={[
            {
              label: "Oui",
              nativeInputProps: {
                value: "true",
                checked: input.interruptionFauteGrave === true,
                onChange: () => onChange("interruptionFauteGrave", true),
                "data-testid": "interruptionFauteGrave-Oui",
              } as any,
            },
            {
              label: "Non",
              nativeInputProps: {
                value: "false",
                checked: input.interruptionFauteGrave === false,
                onChange: () => onChange("interruptionFauteGrave", false),
                "data-testid": "interruptionFauteGrave-Non",
              } as any,
            },
          ]}
          state={errors.interruptionFauteGrave ? "error" : "default"}
          stateRelatedMessage={errors.interruptionFauteGrave}
          orientation="horizontal"
        />
      </div>

      {/* Question sur le refus de renouvellement */}
      <div className={fr.cx("fr-mb-3w")}>
        <RadioButtons
          legend="Le salarié a-t-il refusé de renouveler le CDD alors que le renouvellement et ses modalités étaient prévus dès l'origine dans son contrat ?"
          name="refusRenouvellementAuto"
          options={[
            {
              label: "Oui",
              nativeInputProps: {
                value: "true",
                checked: input.refusRenouvellementAuto === true,
                onChange: () => onChange("refusRenouvellementAuto", true),
                "data-testid": "refusRenouvellementAuto-Oui",
              } as any,
            },
            {
              label: "Non",
              nativeInputProps: {
                value: "false",
                checked: input.refusRenouvellementAuto === false,
                onChange: () => onChange("refusRenouvellementAuto", false),
                "data-testid": "refusRenouvellementAuto-Non",
              } as any,
            },
          ]}
          state={errors.refusRenouvellementAuto ? "error" : "default"}
          stateRelatedMessage={errors.refusRenouvellementAuto}
          orientation="horizontal"
        />
      </div>
    </div>
  );
};
