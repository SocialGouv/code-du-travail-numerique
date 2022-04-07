import React, { useEffect, useState } from "react";
import {
  mapToPublicodesSituationForIndemniteLicenciement,
  MissingArgs,
  usePublicodes,
} from "../../publicodes";
import {
  IndemniteLicenciementFormContent,
  WizardStepProps,
} from "../../common/type/WizardType";
import SalaireRefLegale from "../components/modules/SalaireRefLegale";
import AskSalaires from "../components/modules/AskSalaires";
import SalaireWithPreavis from "../components/modules/SalaireWithPreavis";

const SalairesStep = ({
  form,
}: WizardStepProps<IndemniteLicenciementFormContent>) => {
  const publicodesContext = usePublicodes();
  const [data, setData] = useState<MissingArgs[]>([]);
  const [agreementRule, setAgreementRule] = useState<string | null>(null);

  const values = form.getState().values;

  useEffect(() => {
    publicodesContext.setSituation(
      mapToPublicodesSituationForIndemniteLicenciement(
        values.ccn,
        "12",
        values.inaptitude ?? false,
        values.salaireRef
      )
    );
    setData(publicodesContext.missingArgs);
    setAgreementRule(
      publicodesContext.missingArgs
        .filter(
          (item) =>
            item.name !==
            "contrat salarié - indemnité de licenciement légale - salaire de référence"
        )
        .pop()?.rawNode.cdtn?.front_rules ?? null
    );
  }, [values]);

  console.log("MissingArgs:", data);
  console.log("AgreementRule:", agreementRule);

  return (
    <>
      <SalaireRefLegale form={form} />
      {agreementRule === "salaire_reference_boulangerie" && (
        <SalaireWithPreavis form={form} />
      )}
    </>
  );
};

export default SalairesStep;
