import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement16Informations() {
  const { hasVariablePay } = useIndemniteLicenciementStore((state) => ({
    hasVariablePay: state.agreement16Data.input.hasVariablePay,
  }));

  return (
    <>
      <li>
        Le salarié perçoit du variable sur les 12 derniers mois &nbsp;:&nbsp;
        {hasVariablePay === "oui" ? "Oui" : "Non"}
      </li>
    </>
  );
}
