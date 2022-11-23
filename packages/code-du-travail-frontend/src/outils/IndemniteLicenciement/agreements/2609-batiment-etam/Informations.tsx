import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement2609Informations() {
  const { hasVariablePay } = useIndemniteLicenciementStore((state) => ({
    hasVariablePay: state.agreement2609Data.input.hasVariablePay,
  }));

  return (
    <>
      <li>
        Les salaires indiqués comportent une partie variable &nbsp;:&nbsp;
        {hasVariablePay === "oui" ? "Oui" : "Non"}
      </li>
    </>
  );
}
