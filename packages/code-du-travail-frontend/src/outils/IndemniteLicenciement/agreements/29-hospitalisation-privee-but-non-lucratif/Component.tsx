import React, { useContext, useEffect } from "react";
import { RadioQuestion, TextQuestion } from "../../../Components";
import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";
import { icons } from "@socialgouv/cdtn-ui";

export default function Agreement29() {
  const store = useContext(IndemniteLicenciementContext);
  const {
    hasSixBestSalaries,
    onChangeHasSixBestSalaries,
    errorHasSixBestSalaries,
    sixBestSalariesTotal,
    onChangeSixBestSalariesTotal,
    errorSixBestSalariesTotal,
    init,
    shouldAskSixBestSalaries,
    hasSameSalary,
  } = useIndemniteLicenciementStore(store, (state) => ({
    hasSixBestSalaries: state.agreement29Data.input.hasSixBestSalaries,
    onChangeHasSixBestSalaries:
      state.agreement29Function.onChangeHasSixBestSalaries,
    errorHasSixBestSalaries:
      state.agreement29Data.error.errorHasSixBestSalaries,
    sixBestSalariesTotal: state.agreement29Data.input.sixBestSalariesTotal,
    onChangeSixBestSalariesTotal:
      state.agreement29Function.onChangeSixBestSalariesTotal,
    errorSixBestSalariesTotal:
      state.agreement29Data.error.errorSixBestSalariesTotal,
    init: state.agreement29Function.init,
    shouldAskSixBestSalaries:
      state.agreement29Data.input.shouldAskSixBestSalaries,
    hasSameSalary: state.salairesData.input.hasSameSalary,
  }));

  useEffect(() => {
    init();
  }, [init]);
  return shouldAskSixBestSalaries ? (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
            id: "hasSixBestSalaries-oui",
          },
          {
            label: "Non",
            value: "non",
            id: "hasSixBestSalaries-non",
          },
        ]}
        name="hasSixBestSalaries"
        label="Connaissez vous la somme des meilleurs salaires perçus sur une période de 6 mois consécutifs ?"
        selectedOption={hasSixBestSalaries}
        onChangeSelectedOption={onChangeHasSixBestSalaries}
        error={errorHasSixBestSalaries}
        showRequired
      />
      {hasSixBestSalaries === "oui" && (
        <TextQuestion
          label="Somme des meilleurs salaires perçus sur une période de 6 mois consécutifs"
          inputType="number"
          value={`${sixBestSalariesTotal}`}
          onChange={onChangeSixBestSalariesTotal}
          error={errorSixBestSalariesTotal}
          id="sixBestSalariesTotal"
          showRequired
          icon={icons.Euro}
          smallText="Prendre en compte les primes et avantages en nature."
        />
      )}
      {hasSixBestSalaries === "non" && (
        <p>
          Le calcul de l’indemnité de licenciement nécessite le total des 6
          meilleurs salaires perçus consécutivement durant le contrat de
          travail. Pour réaliser cette simulation, nous calculerons ce total sur
          la base
          {hasSameSalary == "oui"
            ? " du salaire renseigné "
            : " des salaires renseignés "}
          précédemment. En conséquence, le résultat donné pourrait ne pas
          correspondre exactement à votre situation.
        </p>
      )}
    </>
  ) : (
    <></>
  );
}
