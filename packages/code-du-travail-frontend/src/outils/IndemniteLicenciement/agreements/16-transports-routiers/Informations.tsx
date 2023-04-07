import { useContext } from "react";
import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";

export default function Agreement16Informations() {
  const store = useContext(IndemniteLicenciementContext);
  const { showVariablePay, hasVariablePay } = useIndemniteLicenciementStore(
    store,
    (state) => ({
      showVariablePay: state.agreement16Data.input.showVariablePay,
      hasVariablePay: state.agreement16Data.input.hasVariablePay,
    })
  );

  return (
    <>
      {showVariablePay && (
        <li>
          Les salaires indiqués comportent une partie variable &nbsp;:&nbsp;
          {hasVariablePay === "oui" ? "Oui" : "Non"}
        </li>
      )}
    </>
  );
}
