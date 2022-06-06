import React from "react";

import { FauteGrave, RadioQuestion, TypeContratMessage } from "../components";
import { useIndemniteLicenciementStore } from "../store";

const StepContratTravail = () => {
  const {
    licenciementFauteGrave,
    onChangeLicenciementFauteGrave,
    licenciementInaptitude,
    onChangeLicenciementInaptitude,
    typeContratTravail,
    onChangeTypeContratTravail,
    errorLicenciementFauteGrave,
    errorLicenciementInaptitude,
    errorTypeContratTravail,
    errorCdd,
    errorFauteGrave,
  } = useIndemniteLicenciementStore((state) => ({
    ...state,
  }));

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Contrat à durée determiné (CDD) ou contrat d’intérim",
            value: "cdd",
          },
          {
            label: "Contrat à durée indeterminé (CDI)",
            value: "cdi",
          },
        ]}
        label="Quel est le type du contrat de travail&nbsp;?"
        selectedOption={typeContratTravail}
        onChangeSelectedOption={onChangeTypeContratTravail}
        error={errorTypeContratTravail}
      />
      {errorCdd && <TypeContratMessage />}
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
          },
          {
            label: "Non",
            value: "non",
          },
        ]}
        label="Le licenciement est-il dû à une faute grave (ou lourde)&nbsp;?"
        selectedOption={licenciementFauteGrave}
        onChangeSelectedOption={onChangeLicenciementFauteGrave}
        error={errorLicenciementFauteGrave}
      />
      {errorFauteGrave && <FauteGrave />}
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
          },
          {
            label: "Non",
            value: "non",
          },
        ]}
        label="Le licenciement est-il dû à une inaptitude suite à un accident du travail ou maladie professionnelle reconnue&nbsp;?"
        selectedOption={licenciementInaptitude}
        onChangeSelectedOption={onChangeLicenciementInaptitude}
        error={errorLicenciementInaptitude}
      />
    </>
  );
};

export default StepContratTravail;
