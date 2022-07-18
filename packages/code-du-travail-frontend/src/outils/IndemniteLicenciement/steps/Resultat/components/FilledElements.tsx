import { Absence, SalaryPeriods } from "@socialgouv/modeles-social";
import { SectionTitle } from "../../../../common/stepStyles";
import { AgreementInformation } from "../../../common";
import { Table, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

type Props = {
  typeContrat: string;
  isLicenciementFauteGrave: boolean;
  agreementName?: string;
  isLicenciementInaptitude: boolean;
  agreementInformations?: AgreementInformation[];
  dateEntree: string;
  dateSortie: string;
  dateNotification: string;
  absencesPeriods: Absence[];
  salaryPeriods: SalaryPeriods[];
};

export default function FilledElements(props: Props) {
  return (
    <>
      <SectionTitle>Éléments saisis</SectionTitle>
      <ul>
        <li>
          <strong>Conditions d&apos;applications</strong>
          <ul>
            <li>
              Type de contrat&nbsp;:&nbsp;{props.typeContrat.toUpperCase()}
            </li>
            <li>
              Licenciement dû à une faute grave&nbsp;:&nbsp;
              {props.isLicenciementFauteGrave ? "Oui" : "Non"}
            </li>
          </ul>
        </li>
        <li>
          <strong>Convention collective</strong>&nbsp;:&nbsp;
          {!props.agreementName ? "Non sélectionnée" : props.agreementName}
        </li>
        <li>
          <strong>Informations</strong>
          <ul>
            <li>
              Licenciement dû à une inaptitude&nbsp;:&nbsp;
              {props.isLicenciementInaptitude ? "Oui*" : "Non"}
            </li>
            {props.agreementInformations &&
              props.agreementInformations.map((info, index) => (
                <li key={"agreement-" + index}>
                  {info.label}&nbsp;:&npsp;{info.value}
                </li>
              ))}
            {props.isLicenciementInaptitude && (
              <i>
                *Le licenciement ayant été licencié pour inaptitude suite à un
                accident du travail ou une maladie professionnelle reconnue, le
                montant de l&apos;indemnité de licenciement légal est doublé
              </i>
            )}
          </ul>
        </li>
        <li>
          <strong>Ancienneté (A)</strong>
          <ul>
            <li>
              Date d&apos;entrée dans l&apos;entreprise&nbsp;:&nbsp;
              {props.dateEntree}
            </li>
            <li>
              Date de notification du licenciement&nbsp;:&nbsp;
              {props.dateNotification}
            </li>
            <li>
              Date de sortie de l&apos;entreprise&nbsp;:&nbsp;
              {props.dateSortie}
            </li>
            <li>
              Absence de plus d&apos;un mois dans le contrat de
              travail&nbsp;:&nbsp;{" "}
              {props.absencesPeriods.length > 0 ? "Oui" : "Non"}
            </li>
            {props.absencesPeriods.length > 0 && (
              <StyledTable>
                <thead>
                  <tr>
                    <th>Motif de l&apos;absence</th>
                    <th>Durée</th>
                  </tr>
                </thead>
                <tbody>
                  {props.absencesPeriods.map((period, index) => (
                    <tr key={"absence-" + index}>
                      <td>{period.motif}</td>
                      <td>{period.durationInMonth} mois</td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            )}
          </ul>
        </li>
        <li>
          <strong>Salaire de référence (Sref)</strong>
          {props.salaryPeriods.length > 0 && (
            <ul>
              <li>
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Mois</th>
                      <th>
                        Salaire{" "}
                        <StyledSpan>
                          (primes et avantages en nature inclus)
                        </StyledSpan>
                      </th>
                      <th>
                        Dont primes{" "}
                        <StyledSpan>(au cours des 3 derniers mois)</StyledSpan>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.salaryPeriods.map((salary, index) => (
                      <tr key={"salary-" + index}>
                        <td>{salary.month}</td>
                        <td>{salary.value} €</td>
                        <td>
                          {salary.prime} {salary.prime && "€"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </StyledTable>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </>
  );
}

const { spacings } = theme;

const StyledSpan = styled.span`
  font-weight: normal;
`;

const StyledTable = styled(Table)`
  text-align: center;
  margin-top: ${spacings.small};
`;
