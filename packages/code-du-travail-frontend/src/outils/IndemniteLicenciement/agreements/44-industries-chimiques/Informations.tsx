import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement44Informations() {
  const { hasSameSalary, hasVariablePay } = useIndemniteLicenciementStore(
    (state) => ({
      hasSameSalary: state.salairesData.input.hasSameSalary,
      hasVariablePay: state.agreement44Data.input.hasVariablePay,
    })
  );

  return (
    <>
      {hasSameSalary === "non" && (
        <li>
          Les salaires indiqués comportent une partie variable &nbsp;:&nbsp;
          {hasVariablePay === "oui" ? "Oui" : "Non"}
        </li>
      )}
    </>
  );
}
