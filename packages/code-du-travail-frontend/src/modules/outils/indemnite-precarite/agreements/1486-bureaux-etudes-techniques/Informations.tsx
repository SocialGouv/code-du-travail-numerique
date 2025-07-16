import React, { useContext } from "react";
import { RadioQuestion } from "src/modules/outils/common/components/RadioQuestion";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../../steps/store";

export default function Agreement1486Informations() {
  const store = useContext(IndemnitePrecariteContext);
  const {
    criteria,
    hasCdiProposal,
    onConventionQuestionChange,
    errorHasCdiProposal,
  } = useIndemnitePrecariteStore(store, (state) => ({
    criteria: state.informationsData.input.criteria,
    hasCdiProposal: state.informationsData.input.hasCdiProposal,
    onConventionQuestionChange:
      state.informationsFunction.onConventionQuestionChange,
    errorHasCdiProposal: state.informationsData.error.hasCdiProposal,
  }));

  // Afficher la question seulement si le type de CDD est "Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès"
  if (
    criteria?.cddType ===
    "Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès"
  ) {
    return (
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
            id: "hasCdiProposal-oui",
          },
          {
            label: "Non",
            value: "non",
            id: "hasCdiProposal-non",
          },
        ]}
        name="hasCdiProposal"
        label="À la fin du CDD, le salarié a-t-il reçu une proposition de CDI ?"
        selectedOption={hasCdiProposal}
        onChangeSelectedOption={(value: string) =>
          onConventionQuestionChange("hasCdiProposal", value)
        }
        error={errorHasCdiProposal}
      />
    );
  }

  return <></>;
}
