import { Absence, SalaryPeriods } from "@socialgouv/modeles-social";
import { SectionTitle } from "../../../../common/stepStyles";
import { AgreementInformation } from "../../../common";
import { Paragraph, Table, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { publicodesUnitTranslator } from "../../../../publicodes";
import AbsenceTable from "./AbsenceTable";
import {
  generateResultSalaireTempsPlein,
  generateResultSameSalary,
} from "../../../utils/question";
import { IndemniteDepartType } from "../../../../types";
import { formatToEuro } from "../../../../../common/formatToEuro";

type SituationItem = {
  text: string;
  value: string;
  detail?: string;
};

type Props = {
  contractTravail: SituationItem[];
  agreementName?: string;
  isArretTravail: boolean;
  agreementInformations?: AgreementInformation[];
  agreementRefSalaryInfo: React.ReactNode;
  dateEntree: string;
  dateSortie: string;
  dateNotification?: string;
  absencesPeriods: Absence[];
  salaryPeriods: SalaryPeriods[];
  hasTempsPartiel: boolean;
  isAgreementBetter: boolean;
  hasSameSalary: boolean;
  salary?: string;
  isStepSalaryHidden: boolean;
  showHasTempsPartiel: boolean;
  disableParentalNotice?: boolean;
  type: IndemniteDepartType;
};

export default function FilledElements(props: Props) {
  return (
    <>
      <SectionTitle>Éléments saisis</SectionTitle>
      <ul>
        <li>
          <strong>Contrat de travail</strong>
          <ul>
            {props.contractTravail.map((item) => {
              return (
                <li key={item.text}>
                  {item.text}&nbsp;:&nbsp;{item.value}
                  {item.detail && "*"}
                  {item.detail && (
                    <Paragraph italic noMargin>
                      * {item.detail}
                    </Paragraph>
                  )}
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          <strong>Convention collective</strong>&nbsp;:&nbsp;
          {props.agreementName ??
            "La convention collective n’a pas été renseignée"}
        </li>
        {props.agreementInformations &&
          props.agreementInformations.length > 0 && (
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
              Date de début du contrat de travail&nbsp;:&nbsp;
              {props.dateEntree}
            </li>
            {props.dateNotification && (
              <li>
                Date de notification du licenciement&nbsp;:&nbsp;
                {props.dateNotification}
              </li>
            )}
            <li>
              Date de fin du contrat de travail&nbsp;:&nbsp;
              {props.dateSortie}
            </li>
            <li>
              Absences de plus d&apos;un mois durant le contrat de travail
              {!props.disableParentalNotice && <sup>*</sup>}&nbsp;:&nbsp;
              {props.absencesPeriods.length > 0 ? "Oui" : "Non"}
              {!props.disableParentalNotice && (
                <Paragraph fontSize="small" noMargin italic>
                  <sup>*</sup> Depuis le 11 mars 2023 les périodes d’absence
                  pour congé paternité ne sont plus retirées de l’ancienneté du
                  salarié. Si le salarié a pris un congé paternité avant cette
                  date, il peut être décompté de son ancienneté et de ce fait,
                  donner lieu à un montant d’indemnité moins favorable que celui
                  de notre simulateur.
                </Paragraph>
              )}
            </li>
            <AbsenceTable absencesPeriods={props.absencesPeriods} />
          </ul>
        </li>
        {!props.isStepSalaryHidden && (
          <li>
            <strong>Salaire de référence (Sref)</strong>
            <ul>
              {props.showHasTempsPartiel && (
                <li>
                  Alternance temps plein / temps partiel&nbsp;:&nbsp;
                  {props.hasTempsPartiel ? "Oui" : "Non"}
                </li>
              )}
              <li>
                {generateResultSameSalary(
                  props.type,
                  props.isArretTravail ? "oui" : "non",
                  props.salaryPeriods
                )}
                &nbsp;:&nbsp;
                {props.hasSameSalary ? "Oui" : "Non"}
              </li>
              {props.hasSameSalary && props.salary && (
                <li>
                  Salaire mensuel brut (primes et avantages en nature
                  inclus)&nbsp;:&nbsp;
                  <span
                    dangerouslySetInnerHTML={{
                      __html: formatToEuro(parseFloat(props.salary)),
                    }}
                  />
                </li>
              )}
              {props.salaryPeriods.length > 0 && !props.hasSameSalary && (
                <li>
                  {generateResultSalaireTempsPlein(
                    props.type,
                    props.isArretTravail ? "oui" : "non",
                    props.salaryPeriods
                  )}
                  &nbsp;:&nbsp;
                  <StyledFilledElementTable>
                    <Caption>Salaires et Primes mensuelles</Caption>
                    <thead>
                      <tr>
                        <th scope="col">Mois</th>
                        <th scope="col">
                          Salaires
                          <br />
                          <StyledFilledElementSpan>
                            (primes et avantages en nature inclus)
                          </StyledFilledElementSpan>
                        </th>
                        <th scope="col">
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
                        <tr
                          key={"salary-" + index}
                          data-testid={"table-salary-row"}
                        >
                          <th scope="row">{salary.month}</th>
                          <td>{formatToEuro(salary.value ?? 0)}</td>
                          <td>
                            {salary.prime !== undefined &&
                              formatToEuro(salary.prime)}
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

  tbody {
    th {
      font-weight: normal;
    }
  }
`;

const Caption = styled.caption`
  text-align: left;
  display: none;
`;
