import React, { useEffect, useState } from "react";
import { isPositiveNumber } from "../../common/validators";
import {
  mapToPublicodesSituationForIndemniteLicenciement,
  MissingArgs,
  usePublicodes,
} from "../../publicodes";
import {
  IndemniteLicenciementFormContent,
  WizardStepProps,
} from "../../common/type/WizardType";
import { TextQuestion } from "../../common/TextQuestion";
import SalaireRefLegale from "../components/modules/SalaireRefLegale";

const SalairesStep = ({
  form,
}: WizardStepProps<IndemniteLicenciementFormContent>) => {
  const publicodesContext = usePublicodes();
  const [data, setData] = useState<MissingArgs[]>([]);

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
  }, [values]);

  console.log("Result: ", data);
  return (
    <>
      <SalaireRefLegale form={form} />
      <TextQuestion
        name="salaireRef"
        label={"Salaire de référence"}
        inputType="number"
        validate={isPositiveNumber}
        validateOnChange
        placeholder="0"
      />
    </>
  );
};

export default SalairesStep;
