import React, { useContext } from "react";
import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";

export default function Agreement1702Informations() {
  const store = useContext(IndemniteDepartContext);
  const { noticeSalaryPeriods, hasReceivedSalaries } = useIndemniteDepartStore(
    store,
    (state) => ({
      noticeSalaryPeriods:
        state.agreement1702Data.input.noticeSalaryPeriods ?? [],
      hasReceivedSalaries: state.agreement1702Data.input.hasReceivedSalaries,
    })
  );

  return (
    <>
      {noticeSalaryPeriods.length > 0 && (
        <>
          <li>
            Connaissance du montant des salaires perçus pendant le préavis
            &nbsp;:&nbsp;
            {hasReceivedSalaries === "oui" ? "Oui" : "Non"}
          </li>

          {hasReceivedSalaries === "oui" && (
            <li>
              <p>Salaires perçus pendant le préavis&nbsp;:</p>

              <table data-testid={"result-table"}>
                <thead>
                  <tr>
                    <th>Mois</th>
                    <th>
                      Salaire{noticeSalaryPeriods.length > 1 && "s"}
                      <br />
                      <span className="fr--small">
                        (primes et avantages en nature inclus)
                      </span>
                    </th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          )}
        </>
      )}
    </>
  );
}
