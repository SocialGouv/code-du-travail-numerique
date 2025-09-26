import { Input } from "@codegouvfr/react-dsfr/Input";
import { SalaryPeriods } from "@socialgouv/modeles-social";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { preventScroll } from "src/modules/outils/common/utils/input";
import { defaultInputStyle } from "src/modules/outils/common/styles/input";
import HighlightSalary from "./HighlightSalary";
import { SalaryFieldError } from "../store/types";

type Props = {
  title: string;
  salaryPeriods: SalaryPeriods[];
  onSalariesChange: (salaries: SalaryPeriods[]) => void;
  errorSalaryPeriods?: Record<string, SalaryFieldError | null>;
  errorPrimeSalaryPeriods?: Record<string, SalaryFieldError | null>;
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
  errorSalaryPeriods,
  errorPrimeSalaryPeriods,
  title,
  note,
  dataTestidSalaries,
  noPrime,
  autoFocus = false,
  agreementNumber,
  salaireTempsPleinMessage,
}: Props) => {
  const salaryInputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const primeInputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const hasFocusedRef = React.useRef(false);

  React.useEffect(() => {
    if (!hasFocusedRef.current) {
      const firstSalaryErrorIndex = salaryPeriods.findIndex(
        (_, index) =>
          errorSalaryPeriods &&
          errorSalaryPeriods[`${index}`] !== null &&
          errorSalaryPeriods[`${index}`] !== undefined
      );

      if (
        firstSalaryErrorIndex !== -1 &&
        salaryInputRefs.current[firstSalaryErrorIndex]
      ) {
        salaryInputRefs.current[firstSalaryErrorIndex]?.focus();
        salaryInputRefs.current[firstSalaryErrorIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        hasFocusedRef.current = true;
        return;
      }

      const firstPrimeErrorIndex = errorPrimeSalaryPeriods
        ? Object.keys(errorPrimeSalaryPeriods).find(
            (key) =>
              errorPrimeSalaryPeriods[key] !== null &&
              errorPrimeSalaryPeriods[key] !== undefined
          )
        : undefined;

      if (firstPrimeErrorIndex !== undefined) {
        const index = parseInt(firstPrimeErrorIndex);
        if (primeInputRefs.current[index]) {
          primeInputRefs.current[index]?.focus();
          primeInputRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          hasFocusedRef.current = true;
        }
      }
    }
  }, [errorSalaryPeriods, errorPrimeSalaryPeriods, salaryPeriods]);

  const onChangeSalaries = (index: number, value: string) => {
    const salary = parseFloat(value);
    const newLocalSalaries: SalaryPeriods[] = salaryPeriods.map((p, i) =>
      i === index ? { ...p, value: salary } : p
    );
    onSalariesChange(newLocalSalaries);
  };

  const onChangeLocalPrimes = (index: number, value: string) => {
    const prime = value.length > 0 ? parseFloat(value) : undefined;
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
    <fieldset>
      <legend className={fr.cx("fr-text--bold", "fr-mb-2w")}>{title}</legend>
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
                            errorSalaryPeriods &&
                            errorSalaryPeriods[`${index}`] !== null
                              ? "error"
                              : "default"
                          }
                          stateRelatedMessage={
                            errorSalaryPeriods && errorSalaryPeriods[`${index}`]
                              ? errorSalaryPeriods[`${index}`]?.message
                              : ""
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
                              errorPrimeSalaryPeriods &&
                              errorPrimeSalaryPeriods[`${index}`] !== null
                                ? "error"
                                : "default"
                            }
                            stateRelatedMessage={
                              errorPrimeSalaryPeriods &&
                              errorPrimeSalaryPeriods[`${index}`]
                                ? errorPrimeSalaryPeriods[`${index}`]?.message
                                : ""
                            }
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

      {note && <p className={fr.cx("fr-text--sm", "fr-mt-2w")}>{note}</p>}
    </fieldset>
  );
};

export default SalaireTempsPlein;
