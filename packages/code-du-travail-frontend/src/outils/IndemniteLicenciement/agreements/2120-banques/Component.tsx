import React, { useContext } from "react";
import { icons } from "@socialgouv/cdtn-ui";

import { TextQuestion } from "../../../Components";
import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";

export default function Agreement2120() {
  const store = useContext(IndemniteLicenciementContext);
  const {
    salariesVariablePart,
    onChangeSalariesVariablePart,
    errorSalariesVariablePart,
    isLicenciementDisciplinaire,
    init,
  } = useIndemniteLicenciementStore(store, (state) => ({
    salariesVariablePart: state.agreement2120Data.input.salariesVariablePart,
    onChangeSalariesVariablePart:
      state.agreement2120Function.onChangeSalariesVariablePart,
    errorSalariesVariablePart:
      state.agreement2120Data.error.errorSalariesVariablePart,
    isLicenciementDisciplinaire:
      state.agreement2120Data.input.isLicenciementDisciplinaire,
    init: state.agreement2120Function.init,
  }));

  React.useEffect(() => {
    init();
  }, []);

  if (isLicenciementDisciplinaire) return <></>;
  return (
    <TextQuestion
      label="Montant total des éléments variables perçus au cours des 12 derniers mois précédant la notification du licenciement"
      subLabel="Indiquez le montant total des éléments variables, primes (à l’exception du 13ème mois) et avantages en nature perçus au cours des 12 derniers mois précédant la notification du licenciement"
      inputType="number"
      value={salariesVariablePart}
      onChange={onChangeSalariesVariablePart}
      error={errorSalariesVariablePart}
      id="salariesVariablePart"
      showRequired
      text="€"
      tooltip={{
        content: (
          <>
            <p>
              Vous pouvez trouver ces éléments sur votre bulletin de paie.
              Renseignez dans ce champ la somme des primes (fixes ou
              exceptionnelles, sauf prime ou gratification librement versée par
              l’employeur), éléments variables (ex : commissions) et avantages
              en nature (ex : mise à disposition d’un logement ou d’un véhicule)
              perçus au cours des 12 mois précédant la notification du
              licenciement.
            </p>
            <p>
              Le montant renseigné nous permettra de calculer l’indemnité de
              licenciement prévue par la convention collective de la banque qui
              est calculée sur la base des salaires sans ces éléments de
              rémunération. Il sera donc déduit du/des salaires renseigné(s) à
              la question précédente. A l’inverse, l’indemnité prévue par le
              code du travail est calculée sur la base des salaires avec ces
              éléments de rémunération.
            </p>
          </>
        ),
      }}
    />
  );
}
