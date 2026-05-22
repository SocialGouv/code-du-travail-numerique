import React, { useContext } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { CheckboxesQuestion } from "src/modules/outils/common/components/CheckboxesQuestion";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../../steps/store";
import { CDD_TYPES } from "../cddTypesFactory";

export default function Agreement1486Informations() {
  const store = useContext(IndemnitePrecariteContext);
  const { criteria, hasCdiProposal, onConventionQuestionChange } =
    useIndemnitePrecariteStore(store, (state) => ({
      criteria: state.informationsData.input.criteria,
      hasCdiProposal: state.informationsData.input.hasCdiProposal,
      onConventionQuestionChange:
        state.informationsFunction.onConventionQuestionChange,
    }));

  if (criteria?.cddType !== CDD_TYPES.INTERVENTION_FOIRES_SALONS) {
    return <></>;
  }

  return (
    <div className={fr.cx("fr-mb-3w")}>
      <CheckboxesQuestion<"hasCdiProposal">
        name="hasCdiProposal"
        legend="Cochez la situation suivante si elle s'applique :"
        options={[
          {
            key: "hasCdiProposal",
            label: "À la fin du CDD, le salarié a reçu une proposition de CDI.",
          },
        ]}
        values={{ hasCdiProposal }}
        onChange={(key, checked) => onConventionQuestionChange(key, checked)}
      />
    </div>
  );
}
