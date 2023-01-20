import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement44Informations() {
  const { hasVariablePay, knowingLastSalary, lastMonthSalary } =
    useIndemniteLicenciementStore((state) => ({
      hasVariablePay: state.agreement44Data.input.hasVariablePay,
      lastMonthSalary: state.agreement44Data.input.lastMonthSalary,
      knowingLastSalary: state.agreement44Data.input.knowingLastSalary,
    }));

  return (
    <>
      {hasVariablePay && (
        <li>
          Les salaires indiqués comportent une partie variable &nbsp;:&nbsp;
          {hasVariablePay === "oui" ? "Oui" : "Non"}
        </li>
      )}

      {knowingLastSalary && (
        <li>
          Le salarié connaissait le salaire du mois précédent la date de
          notification de son licenciement&nbsp;?&nbsp;
          {knowingLastSalary === "oui" ? "Oui" : "Non"}
        </li>
      )}
      {lastMonthSalary && (
        <li>
          Le salaire du mois précédent la date de notification de son
          licenciement est de&nbsp;:&nbsp;
          {lastMonthSalary.value} €{" "}
          {lastMonthSalary.prime
            ? "dont (${lastMonthSalary.prime} € de prime)"
            : ""}
        </li>
      )}
    </>
  );
}
