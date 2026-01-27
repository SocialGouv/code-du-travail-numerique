import React, { useContext } from "react";
import {
  RadioQuestion,
  TextQuestion,
} from "src/modules/outils/common/components";
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
    arretTravail,
    onChangeArretTravail,
    errorArretTravail,
    dateArretTravail,
    onChangeDateArretTravail,
    errorDateArretTravail,
  } = useIndemniteDepartStore(store, (state) => ({
    licenciementInaptitude:
      state.contratTravailData.input.licenciementInaptitude,
    onChangeLicenciementInaptitude:
      state.contratTravailFunction.onChangeLicenciementInaptitude,
    errorLicenciementInaptitude:
      state.contratTravailData.error.errorLicenciementInaptitude,
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
      {licenciementInaptitude === "non" && (
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
          label="Le salarié est-il en arrêt de travail au moment du licenciement&nbsp;?"
          selectedOption={arretTravail}
          onChangeSelectedOption={onChangeArretTravail}
          error={errorArretTravail}
        />
      )}
      {licenciementInaptitude === "non" && arretTravail === "oui" && (
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
