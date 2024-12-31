import { useContext } from "react";

import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";
import { fr } from "@codegouvfr/react-dsfr";

export default function Agreement1483Informations() {
  const store = useContext(IndemniteDepartContext);
  const { noticeSalaryPeriods, hasReceivedSalaries } = useIndemniteDepartStore(
    store,
    (state) => ({
      noticeSalaryPeriods:
        state.agreement1483Data.input.noticeSalaryPeriods ?? [],
      hasReceivedSalaries: state.agreement1483Data.input.hasReceivedSalaries,
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
              <div className={fr.cx("fr-mt-2w", "fr-table")}>
                <div className={fr.cx("fr-table__wrapper")}>
                  <div className={fr.cx("fr-table__container")}>
                    <div className={fr.cx("fr-table__content")}>
                      <table data-testid={"result-table"}>
                        <thead>
                          <tr>
                            <th>Mois</th>
                            <th>
                              Salaire
                              <br />
                              <span className="fr--small">
                                (primes et avantages en nature inclus)
                              </span>
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
                                {salary.prime}{" "}
                                {salary.prime !== undefined && "€"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )}
        </>
      )}
    </>
  );
}
