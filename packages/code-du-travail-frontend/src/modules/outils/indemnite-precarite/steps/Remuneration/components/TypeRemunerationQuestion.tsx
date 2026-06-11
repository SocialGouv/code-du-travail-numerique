import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";

interface Props {
  value?: "total" | "mensuel";
  onChange: (type: "total" | "mensuel") => void;
  error?: string;
}

export const TypeRemunerationQuestion: React.FC<Props> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className={fr.cx("fr-mb-3w")}>
      <RadioButtons
        legend="Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail ?"
        name="typeRemuneration"
        options={[
          {
            label:
              "La rémunération totale brute perçue en € durant le contrat de travail",
            nativeInputProps: {
              value: "total",
              checked: value === "total",
              onChange: () => onChange("total"),
              "data-testid": "typeRemuneration-total",
            } as any,
          },
          {
            label:
              "Les salaires mensuels bruts en € perçus durant le contrat de travail",
            nativeInputProps: {
              value: "mensuel",
              checked: value === "mensuel",
              onChange: () => onChange("mensuel"),
              "data-testid": "typeRemuneration-mensuel",
            } as any,
          },
        ]}
        state={error ? "error" : "default"}
        stateRelatedMessage={error}
        orientation="vertical"
      />
    </div>
  );
};
