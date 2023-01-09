import { Absence, SalaryPeriods } from "@socialgouv/modeles-social";
import { SectionTitle } from "../../../../common/stepStyles";
import { AgreementInformation } from "../../../common";
import { Table, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { publicodesUnitTranslator } from "../../../../publicodes";
import AbsenceTable from "./AbsenceTable";

type Props = {
  typeContrat: string;
  isLicenciementFauteGrave: boolean;
  agreementName?: string;
  isLicenciementInaptitude: boolean;
  isArretTravail: boolean;
  dateArretTravail?: string;
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
  isStepSalaryHidden: boolean;
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
              Licenciement dû à une inaptitude d’origine
              professionnelle&nbsp;:&nbsp;
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
              <li>
                Arrêt de travail au moment du licenciement&nbsp;:&nbsp;
                {props.isArretTravail ? "Oui" : "Non"}
              </li>
              {props.dateArretTravail && (
                <li>
                  Date de début de l&apos;arrêt de travail &nbsp;:&nbsp;
                  {props.dateArretTravail}
                </li>
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
                  {info.label}&nbsp;:&nbsp;{info.value.replace(/^'|'$/g, "")}
                  &nbsp;
                  {publicodesUnitTranslator(
                    info.value.replace(/'/g, ""),
                    info.unit
                  )}
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
            <AbsenceTable absencesPeriods={props.absencesPeriods} />
          </ul>
        </li>
        {!props.isStepSalaryHidden && (
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
                  Salaires mensuels bruts perçus au cours des 12 mois précédant
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
        )}
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
