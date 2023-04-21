import { useContext } from "react";
import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";

export default function Agreement44Informations() {
  const store = useContext(IndemniteLicenciementContext);
  const { hasVariablePay, knowingLastSalary, lastMonthSalary } =
    useIndemniteLicenciementStore(store, (state) => ({
      hasVariablePay: state.agreement44Data.input.hasVariablePay,
      lastMonthSalary: state.agreement44Data.input.lastMonthSalary,
      knowingLastSalary: state.agreement44Data.input.knowingLastSalary,
    }));

  return (
    <>
      {hasVariablePay && (
        <li>
          Les salaires indiqués comportent une partie variable&nbsp;:&nbsp;
          {hasVariablePay === "oui" ? "Oui" : "Non"}
        </li>
      )}

      {hasVariablePay && knowingLastSalary && (
        <li>
          Connaissance du montant du dernier salaire perçu&nbsp;:&nbsp;
          {knowingLastSalary === "oui" ? "Oui" : "Non"}
        </li>
      )}
      {knowingLastSalary && lastMonthSalary && lastMonthSalary.value && (
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
