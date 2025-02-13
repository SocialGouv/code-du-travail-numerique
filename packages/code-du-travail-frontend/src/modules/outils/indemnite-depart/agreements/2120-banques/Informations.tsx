import { useContext } from "react";
import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";

export default function Agreement2120Informations() {
  const store = useContext(IndemniteDepartContext);
  const { salariesVariablePart } = useIndemniteDepartStore(store, (state) => ({
    salariesVariablePart: state.agreement2120Data.input.salariesVariablePart,
  }));

  if (salariesVariablePart === undefined) return <></>;

  return (
    <li>
      Montant total des éléments variables, primes (à l’exception du 13ème mois)
      et avantages en nature&nbsp;:&nbsp;
      {salariesVariablePart}&nbsp;€
    </li>
  );
}
