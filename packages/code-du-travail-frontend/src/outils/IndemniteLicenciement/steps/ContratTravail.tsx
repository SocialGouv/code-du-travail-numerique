import React from "react";
import { RadioQuestion } from "../../Components";

import { FauteGrave, TypeContratMessage } from "../components";
import { useIndemniteLicenciementStore } from "../store";

const StepContratTravail = (): JSX.Element => {
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
    errorFauteGrave: state.contratTravailData.error.errorFauteGrave,
    licenciementFauteGrave:
      state.contratTravailData.input.licenciementFauteGrave,
    onChangeLicenciementFauteGrave:
      state.contratTravailFunction.onChangeLicenciementFauteGrave,
    licenciementInaptitude:
      state.contratTravailData.input.licenciementInaptitude,
    onChangeLicenciementInaptitude:
      state.contratTravailFunction.onChangeLicenciementInaptitude,
    typeContratTravail: state.contratTravailData.input.typeContratTravail,
    onChangeTypeContratTravail:
      state.contratTravailFunction.onChangeTypeContratTravail,
    errorLicenciementFauteGrave:
      state.contratTravailData.error.errorLicenciementFauteGrave,
    errorLicenciementInaptitude:
      state.contratTravailData.error.errorLicenciementInaptitude,
    errorTypeContratTravail:
      state.contratTravailData.error.errorTypeContratTravail,
    errorCdd: state.contratTravailData.error.errorCdd,
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
        showRequired
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
        showRequired
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
        showRequired
      />
    </>
  );
};

export default StepContratTravail;
