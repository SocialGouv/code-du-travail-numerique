import React, { useContext } from "react";
import { Paragraph } from "@socialgouv/cdtn-ui";
import {
  StyledFilledElementSpan,
  StyledFilledElementTable,
} from "../../steps/Resultat/components/FilledElements";
import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";

export default function Agreement1672Informations() {
  const store = useContext(IndemniteLicenciementContext);
  const { noticeSalaryPeriods, hasReceivedSalaries } =
    useIndemniteLicenciementStore(store, (state) => ({
      noticeSalaryPeriods:
        state.agreement1672Data.input.noticeSalaryPeriods ?? [],
      hasReceivedSalaries: state.agreement1672Data.input.hasReceivedSalaries,
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
                      Salaire{noticeSalaryPeriods.length > 1 && "s"}
                      <br />
                      <StyledFilledElementSpan>
                        (primes et avantages en nature inclus)
                      </StyledFilledElementSpan>
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
              </StyledFilledElementTable>
            </li>
          )}
        </>
      )}
    </>
  );
}
