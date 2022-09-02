import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement1527Informations() {
  const { hasContractSalary, contractSalary } = useIndemniteLicenciementStore(
    (state) => ({
      hasContractSalary: state.agreement1527Data.input.hasContractSalary,
      contractSalary: state.agreement1527Data.input.contractSalary,
    })
  );

  return (
    <>
      <li>
        Les commissions constituent un élément contractuel de rémunération
        &nbsp;:&nbsp;{hasContractSalary === "oui" ? "Oui" : "Non"}
      </li>
      {hasContractSalary === "oui" && (
        <li>
          Salaire global brut mensuel contractuel dont les commissions
          constituent un élément contractuel de rémunération &nbsp;:&nbsp;
          {contractSalary} €
        </li>
      )}
    </>
  );
}
