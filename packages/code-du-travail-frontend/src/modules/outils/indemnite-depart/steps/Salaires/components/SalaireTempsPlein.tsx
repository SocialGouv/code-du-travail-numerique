import { Input } from "@codegouvfr/react-dsfr/Input";
import { SalaryPeriods } from "@socialgouv/modeles-social";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { preventScroll } from "src/modules/outils/common/utils/input";
import { defaultInputStyle } from "src/modules/outils/common/styles/input";
import HighlightSalary from "./HighlightSalary";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";

type Props = {
  title: string;
  salaryPeriods: SalaryPeriods[];
  onSalariesChange: (salaries: SalaryPeriods[]) => void;
  error?: string;
  note?: string;
  dataTestidSalaries?: string;
  noPrime?: boolean;
  autoFocus?: boolean;
  agreementNumber?: number;
  salaireTempsPleinMessage?: string;
};

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
  salaireTempsPleinMessage,
}: Props) => {
  const [errorsSalaries, setErrorsSalaries] = React.useState({});
  const [errorsPrimes, setErrorsPrimes] = React.useState({});
  const salaryInputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const primeInputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const hasError = (index: number, value: any, errorState: any) => {
    return (
      errorState[`${index}`] ||
      (error && (value === undefined || value === null || value === ""))
    );
  };

  React.useEffect(() => {
    // Focus sur le premier champ de salaire avec erreur (validation ou vide)
    const firstSalaryErrorIndex = salaryPeriods.findIndex((sPeriod, index) =>
      hasError(index, sPeriod.value, errorsSalaries)
    );
    if (firstSalaryErrorIndex !== -1) {
      salaryInputRefs.current[firstSalaryErrorIndex]?.focus();
      return;
    }

    // Focus sur le premier champ de prime avec erreur (validation seulement, les primes peuvent être vides)
    const firstPrimeErrorIndex = Object.keys(errorsPrimes).find(
      (key) => errorsPrimes[key]
    );
    if (firstPrimeErrorIndex !== undefined) {
      const index = parseInt(firstPrimeErrorIndex);
      primeInputRefs.current[index]?.focus();
    }
  }, [errorsSalaries, errorsPrimes, salaryPeriods, error]);

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
        salaireTempsPleinMessage={
          salaireTempsPleinMessage ??
          "Indiquez le montant des salaires (en incluant les primes et avantages en nature) dans le premier champ et le montant des primes dans le second champ (uniquement pour les 3 derniers mois)"
        }
      />
      <div className={fr.cx("fr-mt-3w", "fr-table")}>
        <div className={fr.cx("fr-table__wrapper")}>
          <div className={fr.cx("fr-table__container")}>
            <div className={fr.cx("fr-table__content")}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Mois</th>
                    <th scope="col">
                      Salaire mensuel brut primes incluses (en €)
                    </th>
                    {!noPrime && <th scope="col">Total des primes (en €)</th>}
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
                          nativeInputProps={
                            {
                              type: "number",
                              id: `salary.${index}`,
                              name: `salary.${index}`,
                              value: sPeriod.value ?? "",
                              onChange: (e) =>
                                onChangeSalaries(index, e.target.value),
                              autoFocus: autoFocus ? index === 0 : false,
                              onWheel: preventScroll,
                              "data-testid":
                                dataTestidSalaries ?? "salary-input",
                              ref: (el) =>
                                (salaryInputRefs.current[index] = el),
                            } as any
                          }
                          state={
                            hasError(index, sPeriod.value, errorsSalaries)
                              ? "error"
                              : "default"
                          }
                          stateRelatedMessage={
                            errorsSalaries[`${index}`] ||
                            (error &&
                              (sPeriod.value === undefined ||
                                sPeriod.value === null))
                              ? errorsSalaries[`${index}`] ||
                                "Ce champ est requis"
                              : undefined
                          }
                          classes={{
                            nativeInputOrTextArea: defaultInputStyle,
                          }}
                        />
                      </td>
                      {!noPrime && index < 3 && (
                        <td>
                          <Input
                            label={`Prime exceptionnelle en € pour le mois ${index + 1}`}
                            hideLabel
                            nativeInputProps={
                              {
                                type: "number",
                                id: `prime.${index}`,
                                name: `prime.${index}`,
                                value: sPeriod.prime ?? "",
                                onChange: (e) =>
                                  onChangeLocalPrimes(index, e.target.value),
                                onWheel: preventScroll,
                                "data-testid": dataTestidSalaries
                                  ? "prime-" + dataTestidSalaries
                                  : "prime-input",
                                ref: (el) =>
                                  (primeInputRefs.current[index] = el),
                              } as any
                            }
                            state={
                              errorsPrimes[`${index}`] ? "error" : "default"
                            }
                            stateRelatedMessage={errorsPrimes[`${index}`]}
                            classes={{
                              nativeInputOrTextArea: defaultInputStyle,
                            }}
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
        <AccessibleAlert
          title="Attention"
          description={error}
          severity="error"
          className={["fr-mt-2w"]}
        />
      )}
      {note && <p className={fr.cx("fr-text--sm", "fr-mt-2w")}>{note}</p>}
    </div>
  );
};

export default SalaireTempsPlein;
