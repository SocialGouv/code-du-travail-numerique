import React from "react";
import { RadioQuestion } from "../../../Components";

import { FauteGrave, TypeContratMessage } from "./components";
import { useIndemniteLicenciementStore } from "../../store";

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
  } = useIndemniteLicenciementStore((state) => ({
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
  }));

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Contrat à durée determiné (CDD) ou contrat d’intérim",
            value: "cdd",
            id: "cdd",
          },
          {
            label: "Contrat à durée indeterminé (CDI)",
            value: "cdi",
            id: "cdi",
          },
        ]}
        name="typeContratTravail"
        label="Quel est le type du contrat de travail&nbsp;?"
        selectedOption={typeContratTravail}
        onChangeSelectedOption={onChangeTypeContratTravail}
        error={errorTypeContratTravail}
        showRequired
      />
      {typeContratTravail === "cdd" && <TypeContratMessage />}
      {typeContratTravail === "cdi" && (
        <RadioQuestion
          questions={[
            {
              label: "Oui",
              value: "oui",
              id: "fauteGrave-oui",
            },
            {
              label: "Non",
              value: "non",
              id: "fauteGrave-non",
            },
          ]}
          name="licenciementFauteGrave"
          label="Le licenciement est-il dû à une faute grave (ou lourde)&nbsp;?"
          selectedOption={licenciementFauteGrave}
          onChangeSelectedOption={onChangeLicenciementFauteGrave}
          error={errorLicenciementFauteGrave}
          showRequired
        />
      )}
      {typeContratTravail === "cdi" && licenciementFauteGrave === "oui" && (
        <FauteGrave />
      )}
      {typeContratTravail === "cdi" && licenciementFauteGrave === "non" && (
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
          label="Le licenciement est-il dû à une inaptitude suite à un accident du travail ou maladie professionnelle reconnue&nbsp;?"
          selectedOption={licenciementInaptitude}
          onChangeSelectedOption={onChangeLicenciementInaptitude}
          error={errorLicenciementInaptitude}
          showRequired
        />
      )}
    </>
  );
};

export default StepContratTravail;
