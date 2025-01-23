import { Absence, SalaryPeriods } from "@socialgouv/modeles-social";
import { AgreementInformation } from "../../../common";
import { publicodesUnitTranslator } from "../../../../publicodes";
import AbsenceTable from "./AbsenceTable";
import {
  generateResultSalaireTempsPlein,
  generateResultSameSalary,
} from "../../../utils/question";
import { formatToEuro } from "src/common/formatToEuro";
import { IndemniteDepartType } from "../../../types";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";

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
      <h2>Éléments saisis</h2>
      <ul className={mainListStyle}>
        <li>
          <strong>Contrat de travail</strong>
          <ul className={fr.cx("fr-ml-2w")}>
            {props.contractTravail.map((item) => {
              return (
                <li key={item.text}>
                  {item.text}&nbsp;:&nbsp;{item.value}
                  {item.detail && "*"}
                  {item.detail && (
                    <p style={{ fontStyle: "italic", margin: 0 }}>
                      * {item.detail}
                    </p>
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
              <ul className={fr.cx("fr-ml-2w")}>
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
          <ul className={fr.cx("fr-ml-2w")}>
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
                <p
                  style={{ fontSize: "small", fontStyle: "italic", margin: 0 }}
                >
                  <sup>*</sup> Depuis le 11 mars 2023 les périodes d’absence
                  pour congé paternité ne sont plus retirées de l’ancienneté du
                  salarié. Si le salarié a pris un congé paternité avant cette
                  date, il peut être décompté de son ancienneté et de ce fait,
                  donner lieu à un montant d’indemnité moins favorable que celui
                  de notre simulateur.
                </p>
              )}
            </li>
            <AbsenceTable absencesPeriods={props.absencesPeriods} />
          </ul>
        </li>
        {!props.isStepSalaryHidden && (
          <li>
            <strong>Salaire de référence (Sref)</strong>
            <ul className={fr.cx("fr-ml-2w")}>
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
                  <div className={fr.cx("fr-mt-2w", "fr-table")}>
                    <div className={fr.cx("fr-table__wrapper")}>
                      <div className={fr.cx("fr-table__container")}>
                        <div className={fr.cx("fr-table__content")}>
                          <table>
                            <thead>
                              <tr>
                                <th scope="col">Mois</th>
                                <th scope="col">
                                  Salaires
                                  <br />
                                  <span>
                                    (primes et avantages en nature inclus)
                                  </span>
                                </th>
                                <th scope="col">
                                  Dont primes
                                  <br />
                                  <span>(au cours des 3 derniers mois)</span>
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
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
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

const mainListStyle = css({
  "& > li": {
    listStyleType: "none",
  },
});
