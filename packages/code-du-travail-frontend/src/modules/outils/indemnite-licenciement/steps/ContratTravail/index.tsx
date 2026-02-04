import React, { useContext } from "react";
import { RadioQuestion } from "src/modules/outils/common/components";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/indemnite-depart/store";

const StepContratTravail = () => {
  const store = useContext(IndemniteDepartContext);
  const {
    licenciementInaptitude,
    onChangeLicenciementInaptitude,
    errorLicenciementInaptitude,
  } = useIndemniteDepartStore(store, (state) => ({
    licenciementInaptitude:
      state.contratTravailData.input.licenciementInaptitude,
    onChangeLicenciementInaptitude:
      state.contratTravailFunction.onChangeLicenciementInaptitude,
    errorLicenciementInaptitude:
      state.contratTravailData.error.errorLicenciementInaptitude,
  }));

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
            id: "inaptitude-oui",
          },
          {
            label: "Non",
            value: "non",
            id: "inaptitude-non",
          },
        ]}
        name="licenciementInaptitude"
        label="Le licenciement fait-il suite à une inaptitude professionnelle (suite à un accident du travail ou une maladie professionnelle reconnue)&nbsp;?"
        selectedOption={licenciementInaptitude}
        onChangeSelectedOption={onChangeLicenciementInaptitude}
        error={errorLicenciementInaptitude}
      />
    </>
  );
};

export default StepContratTravail;
