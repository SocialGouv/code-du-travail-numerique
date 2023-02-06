import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement1527Informations() {
  const { hasCommission } = useIndemniteLicenciementStore((state) => ({
    hasCommission: state.agreement1527Data.input.hasCommission,
  }));

  return (
    <>
      <li>
        Le contrat de travail prévoit le versement de commissions&nbsp;:&nbsp;
        {hasCommission === "oui" ? "Oui" : "Non"}
      </li>
    </>
  );
}
