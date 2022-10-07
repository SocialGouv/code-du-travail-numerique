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
        Connaissance du total des 6 meilleurs salaires perçus consécutivement
        durant le contrat de travail &nbsp;:&nbsp;
        {hasSixBestSalaries === "oui" ? "Oui" : "Non"}
      </li>
      {hasSixBestSalaries === "oui" && (
        <li>
          Total des 6 meilleurs salaires perçus consécutivement durant le
          contrat de travail &nbsp;:&nbsp;
          {sixBestSalariesTotal} €
        </li>
      )}
    </>
  ) : (
    <></>
  );
}
