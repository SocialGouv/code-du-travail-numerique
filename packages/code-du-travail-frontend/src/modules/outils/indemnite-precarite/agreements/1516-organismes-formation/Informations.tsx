import React, { useContext } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { CheckboxesQuestion } from "src/modules/outils/common/components/CheckboxesQuestion";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../../steps/store";
import { CDD_TYPES } from "../cddTypesFactory";

export default function Agreement1516Informations() {
  const store = useContext(IndemnitePrecariteContext);
  const { criteria, hasCdiRenewal, onConventionQuestionChange } =
    useIndemnitePrecariteStore(store, (state) => ({
      criteria: state.informationsData.input.criteria,
      hasCdiRenewal: state.informationsData.input.hasCdiRenewal,
      onConventionQuestionChange:
        state.informationsFunction.onConventionQuestionChange,
    }));

  if (criteria?.cddType !== CDD_TYPES.USAGE_1516) {
    return <></>;
  }

  return (
    <div className={fr.cx("fr-mb-3w")}>
      <CheckboxesQuestion<"hasCdiRenewal">
        name="hasCdiRenewal"
        legend="Cochez la situation suivante si elle s'applique :"
        options={[
          {
            key: "hasCdiRenewal",
            label:
              "À la fin du CDD, le salarié a été immédiatement embauché en CDI.",
          },
        ]}
        values={{ hasCdiRenewal }}
        onChange={(key, checked) => onConventionQuestionChange(key, checked)}
      />
    </div>
  );
}
