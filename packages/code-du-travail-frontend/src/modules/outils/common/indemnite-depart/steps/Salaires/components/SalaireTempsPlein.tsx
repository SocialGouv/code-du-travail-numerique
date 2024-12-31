import { Input } from "@codegouvfr/react-dsfr/Input";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { SalaryPeriods } from "@socialgouv/modeles-social";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import HighlightSalary from "./HighlightSalary";
import { getSalairesTempsPleinSubtitle } from "../../../agreements";

type Props = {
  title: string;
  // subTitle?: string; //TODO on a viré ça
  salaryPeriods: SalaryPeriods[];
  onSalariesChange: (salaries: SalaryPeriods[]) => void;
  error?: string;
  note?: string;
  //   tooltip?: Tooltip; //TODO on a viré ça
  dataTestidSalaries?: string;
  noPrime?: boolean;
  autoFocus?: boolean;
  agreementNumber?: number;
};

//TODO: mieux gérer le responsive mobile du tableau

export const SalaireTempsPlein = ({
  salaryPeriods,
  onSalariesChange,
  error,
  title,
  note,
  dataTestidSalaries,
  noPrime,
  autoFocus = false,
  agreementNumber,
}: Props): JSX.Element => {
  const [errorsSalaries, setErrorsSalaries] = React.useState({});
  const [errorsPrimes, setErrorsPrimes] = React.useState({});

  const onChangeSalaries = (index: number, value: string) => {
    const salary = parseFloat(value);
    if (isNaN(salary) && value.length > 0) {
      setErrorsSalaries({
        ...errorsSalaries,
        [`${index}`]: "Veuillez entrer un nombre",
      });
      return;
    } else {
      setErrorsSalaries({
        ...errorsSalaries,
        [`${index}`]: undefined,
      });
    }
    let newLocalSalaries: SalaryPeriods[];

    newLocalSalaries = salaryPeriods.map((p, i) =>
      i === index ? { ...p, value: salary } : p
    );
    onSalariesChange(newLocalSalaries);
  };

  const onChangeLocalPrimes = (index: number, value: string) => {
    const prime = value.length > 0 ? parseFloat(value) : undefined;
    if (prime && isNaN(prime)) {
      setErrorsPrimes({
        ...errorsPrimes,
        [`${index}`]: "Veuillez entrer un nombre",
      });
      return;
    } else {
      setErrorsPrimes({
        ...errorsPrimes,
        [`${index}`]: undefined,
      });
    }
    const newLocalSalaries = salaryPeriods.map((p, i) =>
      i === index
        ? prime
          ? { ...p, prime }
          : { month: p.month, value: p.value }
        : p
    );
    onSalariesChange(newLocalSalaries);
  };

  return (
    <div>
      <p className={fr.cx("fr-text--bold")}>{title}</p>
      <HighlightSalary
        agreementNumber={agreementNumber}
        salaireTempsPlein={getSalairesTempsPleinSubtitle(agreementNumber)}
      />
      <div className={fr.cx("fr-mt-3w", "fr-table")}>
        <div className={fr.cx("fr-table__wrapper")}>
          <div className={fr.cx("fr-table__container")}>
            <div className={fr.cx("fr-table__content")}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Mois</th>
                    <th scope="col">Salaire mensuel brut</th>
                    {!noPrime && <th scope="col">Dont primes</th>}
                  </tr>
                </thead>
                <tbody>
                  {salaryPeriods.map((sPeriod, index) => (
                    <tr key={index}>
                      <td>{sPeriod.month}</td>
                      <td>
                        <Input
                          label={`Salaire mensuel brut en € pour le mois ${index + 1}`}
                          hideLabel
                          nativeInputProps={{
                            type: "number",
                            id: `salary.${index}`,
                            name: `salary.${index}`,
                            value: sPeriod.value ?? "",
                            onChange: (e) =>
                              onChangeSalaries(index, e.target.value),
                            autoFocus: autoFocus ? index === 0 : false,
                          }}
                          data-testid={dataTestidSalaries ?? "salary-input"}
                          state={
                            errorsSalaries[`${index}`] ? "error" : "default"
                          }
                          stateRelatedMessage={errorsSalaries[`${index}`]}
                        />
                      </td>
                      {!noPrime && index < 3 && (
                        <td>
                          <Input
                            label={`Prime exceptionnelle pour le mois ${index + 1}`}
                            hideLabel
                            nativeInputProps={{
                              type: "number",
                              id: `prime.${index}`,
                              name: `prime.${index}`,
                              value: sPeriod.prime ?? "",
                              onChange: (e) =>
                                onChangeLocalPrimes(index, e.target.value),
                            }}
                            state={
                              errorsPrimes[`${index}`] ? "error" : "default"
                            }
                            stateRelatedMessage={errorsPrimes[`${index}`]}
                            data-testid={
                              dataTestidSalaries
                                ? "prime-" + dataTestidSalaries
                                : "prime-input"
                            }
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {error && (
        <Alert
          severity="error"
          title="Erreur"
          description={error}
          className={fr.cx("fr-mt-2w")}
        />
      )}
      {note && <p className={fr.cx("fr-text--sm", "fr-mt-2w")}>{note}</p>}
    </div>
  );
};

export default SalaireTempsPlein;
