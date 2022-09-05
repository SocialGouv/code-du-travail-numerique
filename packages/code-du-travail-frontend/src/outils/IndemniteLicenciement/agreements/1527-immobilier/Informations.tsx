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
        Le salarié perçoit-il des commissions &nbsp;:&nbsp;
        {hasCommission === "oui" ? "Oui" : "Non"}
      </li>
      {hasCommission === "non" && (
        <li>
          Montant du salaire mensuel brut indiqué dans le contrat &nbsp;:&nbsp;
          {contractSalary} €
        </li>
      )}
    </>
  );
}
