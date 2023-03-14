import { useContext } from "react";
import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";

export default function Agreement2609Informations() {
  const store = useContext(IndemniteLicenciementContext);
  const { hasSameSalary, hasVariablePay } = useIndemniteLicenciementStore(
    store,
    (state) => ({
      hasSameSalary: state.salairesData.input.hasSameSalary,
      hasVariablePay: state.agreement2609Data.input.hasVariablePay,
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
