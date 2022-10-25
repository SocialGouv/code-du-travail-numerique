import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement1527Informations() {
  const { hasCommission, contractSalary } = useIndemniteLicenciementStore(
    (state) => ({
      hasCommission: state.agreement1527Data.input.hasCommission,
      contractSalary: state.agreement1527Data.input.contractSalary,
    })
  );

  return (
    <>
      <li>
        Le contrat de travail prévoit le versement de commissions&nbsp;:&nbsp;
        {hasCommission === "oui" ? "Oui" : "Non"}
      </li>
      {hasCommission === "non" && (
        <li>
          Montant du salaire mensuel brut indiqué dans le contrat&nbsp;:&nbsp;
          {contractSalary} €
        </li>
      )}
    </>
  );
}
