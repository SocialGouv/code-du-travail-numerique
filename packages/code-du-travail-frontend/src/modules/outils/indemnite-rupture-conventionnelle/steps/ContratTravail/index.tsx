import React, { useContext } from "react";
import {
  RadioQuestion,
  TextQuestion,
} from "src/modules/outils/common/components";
import { CdiCdd } from "src/modules/outils/indemnite-depart/steps/ContratTravail";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/indemnite-depart/store";

const StepContratTravail = (): JSX.Element => {
  const store = useContext(IndemniteDepartContext);
  const {
    onChangeLicenciementFauteGrave,
    onChangeLicenciementInaptitude,
    typeContratTravail,
    onChangeTypeContratTravail,
    errorTypeContratTravail,
    arretTravail,
    onChangeArretTravail,
    errorArretTravail,
    dateArretTravail,
    onChangeDateArretTravail,
    errorDateArretTravail,
  } = useIndemniteDepartStore(store, (state) => ({
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
    arretTravail: state.contratTravailData.input.arretTravail,
    dateArretTravail: state.contratTravailData.input.dateArretTravail,
    onChangeArretTravail: state.contratTravailFunction.onChangeArretTravail,
    onChangeDateArretTravail:
      state.contratTravailFunction.onChangeDateArretTravail,
    errorArretTravail: state.contratTravailData.error.errorArretTravail,
    errorDateArretTravail: state.contratTravailData.error.errorDateArretTravail,
  }));

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Contrat à durée déterminée (CDD) ou contrat d’intérim",
            value: "cdd",
            id: "cdd",
          },
          {
            label: "Contrat à durée indéterminée (CDI)",
            value: "cdi",
            id: "cdi",
          },
        ]}
        name="typeContratTravail"
        label="Quel est le type du contrat de travail&nbsp;?"
        selectedOption={typeContratTravail}
        onChangeSelectedOption={(value: CdiCdd) => {
          onChangeTypeContratTravail(value);
          if (value === "cdi") {
            onChangeLicenciementFauteGrave("non");
            onChangeLicenciementInaptitude("non");
          }
        }}
        error={errorTypeContratTravail}
        autoFocus
      />
      {typeContratTravail === "cdi" && (
        <RadioQuestion
          questions={[
            {
              label: "Oui",
              value: "oui",
              id: "arretTravail-oui",
            },
            {
              label: "Non",
              value: "non",
              id: "arretTravail-non",
            },
          ]}
          name="licenciementArretTravail"
          label="Le salarié est-il en arrêt de travail au moment de la rupture conventionnelle&nbsp;?"
          selectedOption={arretTravail}
          onChangeSelectedOption={onChangeArretTravail}
          error={errorArretTravail}
        />
      )}
      {typeContratTravail === "cdi" && arretTravail === "oui" && (
        <TextQuestion
          label="Depuis quelle date le salarié est-il en arrêt&nbsp;?"
          inputType="date"
          value={dateArretTravail}
          onChange={onChangeDateArretTravail}
          error={errorDateArretTravail}
          id="dateArretTravail"
          dataTestId={"date-arret-travail"}
        />
      )}
    </>
  );
};

export default StepContratTravail;
