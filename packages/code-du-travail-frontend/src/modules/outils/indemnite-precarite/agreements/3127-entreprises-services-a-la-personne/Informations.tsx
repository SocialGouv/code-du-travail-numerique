import React, { useContext } from "react";
import { RadioQuestion } from "src/modules/outils/common/components/RadioQuestion";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../../steps/store";

export default function Agreement3127Informations() {
  const store = useContext(IndemnitePrecariteContext);
  const {
    criteria,
    hasEquivalentCdiRenewal,
    onConventionQuestionChange,
    errorHasEquivalentCdiRenewal,
  } = useIndemnitePrecariteStore(store, (state) => ({
    criteria: state.informationsData.input.criteria,
    hasEquivalentCdiRenewal:
      state.informationsData.input.hasEquivalentCdiRenewal,
    onConventionQuestionChange:
      state.informationsFunction.onConventionQuestionChange,
    errorHasEquivalentCdiRenewal:
      state.informationsData.error.hasEquivalentCdiRenewal,
  }));

  // Afficher la question seulement si le type de CDD est "CDD dit de « mission ponctuelle ou occasionnelle »"
  if (
    criteria?.cddType === "CDD dit de « mission ponctuelle ou occasionnelle »"
  ) {
    return (
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
            id: "hasEquivalentCdiRenewal-oui",
          },
          {
            label: "Non",
            value: "non",
            id: "hasEquivalentCdiRenewal-non",
          },
        ]}
        name="hasEquivalentCdiRenewal"
        label="À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI, sans interruption, sur un même poste ou sur un poste différent ?"
        selectedOption={hasEquivalentCdiRenewal}
        onChangeSelectedOption={(value: string) =>
          onConventionQuestionChange("hasEquivalentCdiRenewal", value)
        }
        error={errorHasEquivalentCdiRenewal}
      />
    );
  }

  return <></>;
}
