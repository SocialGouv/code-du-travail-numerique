import { Input } from "@codegouvfr/react-dsfr/Input";
import { SalaryPeriods } from "@socialgouv/modeles-social";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { preventScroll } from "src/modules/outils/common/utils/input";
import { defaultInputStyle } from "src/modules/outils/common/styles/input";
import { SalaryFieldError } from "../store/types";
import { css } from "@styled-system/css";

type Props = {
  salaryPeriods: SalaryPeriods[];
  onChangeSalaries: (index: number, value: string) => void;
  onChangeLocalPrimes: (index: number, value: string) => void;
  errorSalaryPeriods?: Record<string, SalaryFieldError | null>;
  errorPrimeSalaryPeriods?: Record<string, SalaryFieldError | null>;
  dataTestidSalaries?: string;
  noPrime?: boolean;
  autoFocus?: boolean;
  salaryInputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  primeInputRefs: React.RefObject<(HTMLInputElement | null)[]>;
};

export const SalaireTempsPleinMobile = ({
  salaryPeriods,
  onChangeSalaries,
  onChangeLocalPrimes,
  errorSalaryPeriods,
  errorPrimeSalaryPeriods,
  dataTestidSalaries,
  noPrime,
  autoFocus = false,
  salaryInputRefs,
  primeInputRefs,
}: Props) => {
  return (
    <div className={`${mobileStyles} ${fr.cx("fr-mt-3w")}`}>
      {salaryPeriods.map((sPeriod, index) => (
        <div key={index} className={fr.cx("fr-p-3w", "fr-mb-2w")}>
          <p className={fr.cx("fr-text--bold", "fr-mb-2w", "fr-text--lg")}>
            {sPeriod.month}
          </p>

          <Input
            label="Salaire mensuel brut primes incluses (en €)"
            nativeInputProps={
              {
                type: "number",
                id: `salary-mobile.${index}`,
                name: `salary.${index}`,
                value: sPeriod.value ?? "",
                onChange: (e) => onChangeSalaries(index, e.target.value),
                autoFocus: autoFocus ? index === 0 : false,
                onWheel: preventScroll,
                "data-testid": dataTestidSalaries ?? "salary-input",
                ref: (el) => (salaryInputRefs.current[index] = el),
                "aria-describedby": `salary-mobile-${index}-desc`,
              } as any
            }
            state={
              errorSalaryPeriods && errorSalaryPeriods[`${index}`] !== null
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

          {!noPrime && index < 3 && (
            <Input
              label="Total des primes (en €)"
              className={fr.cx("fr-mt-2w")}
              nativeInputProps={
                {
                  type: "number",
                  id: `prime-mobile.${index}`,
                  name: `prime.${index}`,
                  value: sPeriod.prime ?? "",
                  onChange: (e) => onChangeLocalPrimes(index, e.target.value),
                  onWheel: preventScroll,
                  "data-testid": dataTestidSalaries
                    ? "prime-" + dataTestidSalaries
                    : "prime-input",
                  ref: (el) => (primeInputRefs.current[index] = el),
                  "aria-describedby": `prime-mobile-${index}-desc`,
                } as any
              }
              state={
                errorPrimeSalaryPeriods &&
                errorPrimeSalaryPeriods[`${index}`] !== null
                  ? "error"
                  : "default"
              }
              stateRelatedMessage={
                errorPrimeSalaryPeriods && errorPrimeSalaryPeriods[`${index}`]
                  ? errorPrimeSalaryPeriods[`${index}`]?.message
                  : ""
              }
              classes={{
                nativeInputOrTextArea: defaultInputStyle,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const mobileStyles = css({
  display: "none",
  "@media (max-width: 768px)": {
    display: "block",
  },
});

export default SalaireTempsPleinMobile;
