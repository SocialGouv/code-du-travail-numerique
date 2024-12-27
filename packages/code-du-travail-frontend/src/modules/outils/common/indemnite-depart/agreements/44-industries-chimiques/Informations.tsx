import { useContext } from "react";
import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";

export default function Agreement44Informations() {
  const store = useContext(IndemniteDepartContext);
  const {
    hasVariablePay,
    knowingLastSalary,
    lastMonthSalary,
    showKnowingLastSalary,
    showLastMonthSalary,
  } = useIndemniteDepartStore(store, (state) => ({
    hasVariablePay: state.agreement44Data.input.hasVariablePay,
    lastMonthSalary: state.agreement44Data.input.lastMonthSalary,
    knowingLastSalary: state.agreement44Data.input.knowingLastSalary,
    showKnowingLastSalary: state.agreement44Data.input.showKnowingLastSalary,
    showLastMonthSalary: state.agreement44Data.input.showLastMonthSalary,
  }));

  return (
    <>
      {hasVariablePay && (
        <li>
          Les salaires indiqués comportent une partie variable&nbsp;:&nbsp;
          {hasVariablePay === "oui" ? "Oui" : "Non"}
        </li>
      )}

      {showKnowingLastSalary && (
        <li>
          Connaissance du montant du dernier salaire perçu&nbsp;:&nbsp;
          {knowingLastSalary === "oui" ? "Oui" : "Non"}
        </li>
      )}
      {showKnowingLastSalary && showLastMonthSalary && lastMonthSalary && (
        <li>
          Salaire perçu au cours du dernier mois&nbsp;:&nbsp;
          {lastMonthSalary.value} €{" "}
          {lastMonthSalary.prime
            ? `(dont ${lastMonthSalary.prime} € de prime)`
            : ""}
        </li>
      )}
    </>
  );
}
