import React, { useContext } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { CheckboxesQuestion } from "src/modules/outils/common/components/CheckboxesQuestion";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../../steps/store";
import { CDD_TYPES } from "../cddTypesFactory";

export default function Agreement3127Informations() {
  const store = useContext(IndemnitePrecariteContext);
  const { criteria, hasEquivalentCdiRenewal, onConventionQuestionChange } =
    useIndemnitePrecariteStore(store, (state) => ({
      criteria: state.informationsData.input.criteria,
      hasEquivalentCdiRenewal:
        state.informationsData.input.hasEquivalentCdiRenewal,
      onConventionQuestionChange:
        state.informationsFunction.onConventionQuestionChange,
    }));

  if (criteria?.cddType !== CDD_TYPES.MISSION_PONCTUELLE) {
    return <></>;
  }

  return (
    <div className={fr.cx("fr-mb-3w")}>
      <CheckboxesQuestion<"hasEquivalentCdiRenewal">
        name="hasEquivalentCdiRenewal"
        legend="Cochez la situation suivante si elle s'applique :"
        options={[
          {
            key: "hasEquivalentCdiRenewal",
            label:
              "À la fin du CDD, le salarié a été immédiatement embauché en CDI, sans interruption, sur un même poste ou sur un poste différent.",
          },
        ]}
        values={{ hasEquivalentCdiRenewal }}
        onChange={(key, checked) => onConventionQuestionChange(key, checked)}
      />
    </div>
  );
}
