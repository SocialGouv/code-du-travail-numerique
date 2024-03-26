import { useContext } from "react";
import { Paragraph } from "@socialgouv/cdtn-ui";

import {
  StyledFilledElementSpan,
  StyledFilledElementTable,
} from "../../steps/Resultat/components/FilledElements";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "../../store";

export default function Agreement1483Informations() {
  const store = useContext(IndemniteDepartContext);
  const { noticeSalaryPeriods, hasReceivedSalaries } =
    useIndemniteDepartStore(store, (state) => ({
      noticeSalaryPeriods:
        state.agreement1483Data.input.noticeSalaryPeriods ?? [],
      hasReceivedSalaries: state.agreement1483Data.input.hasReceivedSalaries,
    }));

  return (
    <>
      {noticeSalaryPeriods.length > 0 && (
        <>
          <li>
            Connaissance du montant des salaires perçus pendant le préavis
            &nbsp;:&nbsp;{hasReceivedSalaries === "oui" ? "Oui" : "Non"}
          </li>

          {hasReceivedSalaries === "oui" && (
            <li>
              <Paragraph noMargin>
                Salaires perçus pendant le préavis&nbsp;:
              </Paragraph>
              <StyledFilledElementTable data-testid={"result-table"}>
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
                    <th>Dont primes</th>
                  </tr>
                </thead>
                <tbody>
                  {noticeSalaryPeriods.map((salary, index) => (
                    <tr
                      key={"salary-agreement-" + index}
                      data-testid={"table-result-row"}
                    >
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
          )}
        </>
      )}
    </>
  );
}
