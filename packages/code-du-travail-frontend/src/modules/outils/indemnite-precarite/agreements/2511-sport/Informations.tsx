import React, { useContext } from "react";
import { RadioQuestion } from "src/modules/outils/common/components/RadioQuestion";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../../steps/store";

export default function Agreement2511Informations() {
  const store = useContext(IndemnitePrecariteContext);
  const {
    criteria,
    hasCdiRenewal,
    onConventionQuestionChange,
    errorHasCdiRenewal,
  } = useIndemnitePrecariteStore(store, (state) => ({
    criteria: state.informationsData.input.criteria,
    hasCdiRenewal: state.informationsData.input.hasCdiRenewal,
    onConventionQuestionChange:
      state.informationsFunction.onConventionQuestionChange,
    errorHasCdiRenewal: state.informationsData.error.hasCdiRenewal,
  }));

  // Afficher la question seulement si le type de CDD est "CDD d'usage appelé « contrat d'intervention »"
  if (criteria?.cddType === "CDD d'usage appelé « contrat d'intervention »") {
    return (
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
            id: "hasCdiRenewal-oui",
          },
          {
            label: "Non",
            value: "non",
            id: "hasCdiRenewal-non",
          },
        ]}
        name="hasCdiRenewal"
        label="À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI ?"
        selectedOption={hasCdiRenewal}
        onChangeSelectedOption={(value: string) =>
          onConventionQuestionChange("hasCdiRenewal", value)
        }
        error={errorHasCdiRenewal}
      />
    );
  }

  return <></>;
}
