import { useEffect } from "react";
import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement29Informations() {
  const {
    hasSixBestSalaries,
    sixBestSalariesTotal,
    init,
    shouldAskSixBestSalaries,
  } = useIndemniteLicenciementStore((state) => ({
    hasSixBestSalaries: state.agreement29Data.input.hasSixBestSalaries,
    sixBestSalariesTotal: state.agreement29Data.input.sixBestSalariesTotal,
    init: state.agreement29Function.init,
    shouldAskSixBestSalaries:
      state.agreement29Data.input.shouldAskSixBestSalaries,
  }));

  useEffect(() => {
    init();
  }, [init]);
  return shouldAskSixBestSalaries ? (
    <>
      <li>
        Connaissance de la somme des meilleurs salaires perçus sur une période
        de 6 mois consécutifs &nbsp;:&nbsp;
        {hasSixBestSalaries === "oui" ? "Oui" : "Non"}
      </li>
      {hasSixBestSalaries === "oui" && (
        <li>
          Somme des meilleurs salaires perçus sur une période de 6 mois
          consécutifs &nbsp;:&nbsp;
          {sixBestSalariesTotal} €
        </li>
      )}
    </>
  ) : (
    <></>
  );
}
