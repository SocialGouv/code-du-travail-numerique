import React from "react";

import { FauteGrave, RadioQuestion, TypeContratMessage } from "../components";
import { useIndemniteLicenciementStore } from "../store";
import { ContratTravailStoreSlice } from "../store/contratTravailStore";

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
  } = useIndemniteLicenciementStore((state: ContratTravailStoreSlice) => ({
    errorFauteGrave: state.errorContratTravail.errorFauteGrave,
    licenciementFauteGrave: state.inputContratTravail.licenciementFauteGrave,
    onChangeLicenciementFauteGrave: state.onChangeLicenciementFauteGrave,
    licenciementInaptitude: state.inputContratTravail.licenciementInaptitude,
    onChangeLicenciementInaptitude: state.onChangeLicenciementInaptitude,
    typeContratTravail: state.inputContratTravail.typeContratTravail,
    onChangeTypeContratTravail: state.onChangeTypeContratTravail,
    errorLicenciementFauteGrave:
      state.errorContratTravail.errorLicenciementFauteGrave,
    errorLicenciementInaptitude:
      state.errorContratTravail.errorLicenciementInaptitude,
    errorTypeContratTravail: state.errorContratTravail.errorTypeContratTravail,
    errorCdd: state.errorContratTravail.errorCdd,
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
