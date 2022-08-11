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
  agreementRefSalaryInfo: React.ReactNode;
  dateEntree: string;
  dateSortie: string;
  dateNotification: string;
  absencesPeriods: Absence[];
  salaryPeriods: SalaryPeriods[];
  hasTempsPartiel: boolean;
  isAgreementBetter: boolean;
  hasSameSalary: boolean;
  salary?: string;
};

export default function FilledElements(props: Props) {
  return (
    <>
      <SectionTitle>Éléments saisis</SectionTitle>
      <ul>
        <li>
          <strong>Contrat de travail</strong>
          <ul>
            <li>
              Type de contrat&nbsp;:&nbsp;{props.typeContrat.toUpperCase()}
            </li>
            <li>
              Licenciement dû à une faute grave (ou lourde)&nbsp;:&nbsp;
              {props.isLicenciementFauteGrave ? "Oui" : "Non"}
            </li>
            <li>
              Licenciement dû à une inaptitude&nbsp;:&nbsp;
              {props.isLicenciementInaptitude ? "Oui" : "Non"}
              {props.isLicenciementInaptitude &&
                !props.isAgreementBetter &&
                "*"}
              {props.isLicenciementInaptitude && !props.isAgreementBetter && (
                <>
                  <br />
                  <i>
                    * Le salarié ayant été licencié pour inaptitude suite à un
                    accident du travail ou une maladie professionnelle reconnue,
                    le montant de l&apos;indemnité de licenciement légale est
                    doublée
                  </i>
                </>
              )}
            </li>
          </ul>
        </li>
        <li>
          <strong>Convention collective</strong>&nbsp;:&nbsp;
          {props.agreementName ??
            "La convention collective n’a pas été renseignée"}
        </li>
        {props.agreementInformations && props.agreementInformations.length > 0 && (
          <li>
            <strong>Informations</strong>
            <ul>
              {props.agreementInformations.map((info, index) => (
                <li key={"agreement-" + index}>
                  {info.label}&nbsp;:&nbsp;{info.value.replace(/'/g, "")}
                </li>
              ))}
            </ul>
          </li>
        )}
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
              Absences de plus d&apos;un mois durant le contrat de
              travail&nbsp;:&nbsp;
              {props.absencesPeriods.length > 0 ? "Oui" : "Non"}
            </li>
            {props.absencesPeriods.length > 0 && (
              <StyledFilledElementTable>
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
              </StyledFilledElementTable>
            )}
          </ul>
        </li>
        <li>
          <strong>Salaire de référence (Sref)</strong>
          <ul>
            <li>
              Alternance temps plein / temps partiel&nbsp;:&nbsp;
              {props.hasTempsPartiel ? "Oui" : "Non"}
            </li>
            <li>
              Salaire mensuel brut identique durant les 12 derniers mois
              précédant la notification du licenciement&nbsp;:&nbsp;
              {props.hasSameSalary ? "Oui" : "Non"}
            </li>
            {props.hasSameSalary && props.salary && (
              <li>
                Salaire mensuel brut (primes et avantages en nature
                inclus)&nbsp;:&nbsp;
                {props.salary} €
              </li>
            )}
            {props.salaryPeriods.length > 0 && !props.hasSameSalary && (
              <li>
                Salaires mensuels bruts perçus au cours des 12 mois précédents
                la notification du licenciement&nbsp;:&nbsp;
                <StyledFilledElementTable>
                  <thead>
                    <tr>
                      <th>Mois</th>
                      <th>
                        Salaires
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
                    {props.salaryPeriods.map((salary, index) => (
                      <tr key={"salary-" + index}>
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
            {props.agreementRefSalaryInfo}
          </ul>
        </li>
      </ul>
    </>
  );
}

const { spacings, fonts } = theme;

export const StyledFilledElementSpan = styled.span`
  font-weight: normal;
  font-size: ${fonts.sizes.small};
`;

export const StyledFilledElementTable = styled(Table)`
  text-align: center;
  margin-top: ${spacings.small};
  margin-bottom: ${spacings.small};
  th {
    vertical-align: top;
  }
`;
