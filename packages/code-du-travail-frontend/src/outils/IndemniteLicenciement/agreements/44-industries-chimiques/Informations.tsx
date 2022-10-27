import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement44Informations() {
  const { hasVariablePay } = useIndemniteLicenciementStore((state) => ({
    hasVariablePay: state.agreement44Data.input.hasVariablePay,
  }));

  return (
    <>
      {hasVariablePay && (
        <li>
          Les salaires indiqués comportent une partie variable &nbsp;:&nbsp;
          {hasVariablePay === "oui" ? "Oui" : "Non"}
        </li>
      )}
    </>
  );
}
