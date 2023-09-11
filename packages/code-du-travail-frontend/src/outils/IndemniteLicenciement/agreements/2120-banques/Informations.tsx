import { useContext } from "react";
import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";

export default function Agreement2120Informations() {
  const store = useContext(IndemniteLicenciementContext);
  const { salariesVariablePart } = useIndemniteLicenciementStore(
    store,
    (state) => ({
      salariesVariablePart: state.agreement2120Data.input.salariesVariablePart,
    })
  );

  return (
    <li>
      Montant total des éléments variables, primes (à l’exception du 13ème mois)
      et avantages en nature&nbsp;:&nbsp;
      {salariesVariablePart}&nbsp;€
    </li>
  );
}
