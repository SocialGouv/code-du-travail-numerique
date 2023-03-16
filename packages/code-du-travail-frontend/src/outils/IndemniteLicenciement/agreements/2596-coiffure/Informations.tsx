import { useContext } from "react";

import {
  StyledFilledElementSpan,
  StyledFilledElementTable,
} from "../../steps/Resultat/components/FilledElements";
import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";

export default function Agreement2596Informations() {
  const store = useContext(IndemniteLicenciementContext);
  const { noticeSalaryPeriods, hasReceivedSalaries } =
    useIndemniteLicenciementStore(store, (state) => ({
      noticeSalaryPeriods:
        state.agreement2596Data.input.noticeSalaryPeriods ?? [],
      hasReceivedSalaries: state.agreement2596Data.input.hasReceivedSalaries,
    }));

  return (
    <>
      {noticeSalaryPeriods.length > 0 && (
        <>
          <li>
            Connaissance du montant des salaires perçus pendant le préavis
            &nbsp;:&nbsp;{hasReceivedSalaries === "oui" ? "Oui" : "Non"}
          </li>
          <li>
            Salaires perçus pendant le préavis
            {hasReceivedSalaries === "non" && "*"}&nbsp;:&nbsp;
            {hasReceivedSalaries === "non" && (
              <>
                <br />
                <i>
                  * Le calcul de l’indemnité nécessite le salaire le plus élevé
                  perçu au cours des 3 derniers mois de travail (incluant le
                  préavis). Pour réaliser cette simulation nous avons pris en
                  compte le salaire le plus élevé perçu au cours des 12 derniers
                  mois précédant la notification du licenciement. En
                  conséquence, le résultat obtenu pourrait ne pas correspondre
                  exactement à votre situation.
                </i>
              </>
            )}
            <StyledFilledElementTable>
              <thead>
                <tr>
                  <th>Mois</th>
                  <th>
                    Salaire
                    <br />
                    <StyledFilledElementSpan>
                      (primes et avantages en nature inclus)
                    </StyledFilledElementSpan>
                  </th>
                  <th>
                    Dont primes
                    <br />
                    <StyledFilledElementSpan>
                      (au cours des 3 derniers mois)
                    </StyledFilledElementSpan>
                  </th>
                </tr>
              </thead>
              <tbody>
                {noticeSalaryPeriods.map((salary, index) => (
                  <tr key={"salary-agreement-" + index}>
                    <td>{salary.month}</td>
                    <td>{salary.value} €</td>
                    <td>
                      {salary.prime} {salary.prime !== undefined && "€"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledFilledElementTable>
          </li>
        </>
      )}
    </>
  );
}
