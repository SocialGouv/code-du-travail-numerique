import { Input } from "@codegouvfr/react-dsfr/Input";
import { Table } from "@codegouvfr/react-dsfr/Table";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { SalaryPeriods } from "@socialgouv/modeles-social";
import React from "react";
import Html from "src/modules/common/Html";
import { Tooltip } from "src/modules/outils/common/components/types";

type Props = {
  title: string;
  subTitle?: string;
  salaryPeriods: SalaryPeriods[];
  onSalariesChange: (salaries: SalaryPeriods[]) => void;
  error?: string;
  note?: string;
  tooltip?: Tooltip;
  dataTestidSalaries?: string;
  noPrime?: boolean;
  autoFocus?: boolean;
};

export const SalaireTempsPlein = ({
  salaryPeriods,
  onSalariesChange,
  error,
  title,
  note,
  subTitle,
  tooltip,
  dataTestidSalaries,
  noPrime,
  autoFocus = false,
}: Props): JSX.Element => {
  const [isFirstEdit, setIsFirstEdit] = React.useState(true);
  const [errorsSalaries, setErrorsSalaries] = React.useState<any>({});
  const [errorsPrimes, setErrorsPrimes] = React.useState<any>({});

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
    if (isFirstEdit) {
      newLocalSalaries = salaryPeriods.map((p, i) =>
        i >= index ? { ...p, value: salary } : p
      );
    } else {
      newLocalSalaries = salaryPeriods.map((p, i) =>
        i === index ? { ...p, value: salary } : p
      );
    }
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

  const tableHeaders = [
    { label: "Mois", attribute: "scope", value: "col" },
    { label: "Salaire mensuel brut", attribute: "scope", value: "col" },
    !noPrime && { label: "Dont primes", attribute: "scope", value: "col" },
  ].filter(Boolean);

  const tableData = salaryPeriods.map((sPeriod, index) => [
    sPeriod.month,
    <Input
      key={`salary-${index}`}
      label={`Salaire mensuel brut en € pour le mois ${index + 1}`}
      nativeInputProps={{
        type: "number",
        id: `salary.${index}`,
        name: `salary.${index}`,
        value: sPeriod.value ?? "",
        onChange: (e) => onChangeSalaries(index, e.target.value),
        onBlur: () => setIsFirstEdit(false),
        "data-testid": dataTestidSalaries ?? "salary-input",
        autoFocus: autoFocus ? index === 0 : false,
      }}
      state={errorsSalaries[`${index}`] ? "error" : "default"}
      stateRelatedMessage={errorsSalaries[`${index}`]}
      hint="€"
    />,
    !noPrime && index < 3 && (
      <Input
        key={`prime-${index}`}
        label={`Prime exceptionnelle pour le mois ${index + 1}`}
        nativeInputProps={{
          type: "number",
          id: `prime.${index}`,
          name: `prime.${index}`,
          value: sPeriod.prime ?? "",
          onChange: (e) => onChangeLocalPrimes(index, e.target.value),
          "data-testid": dataTestidSalaries
            ? "prime-" + dataTestidSalaries
            : "prime-input",
        }}
        state={errorsPrimes[`${index}`] ? "error" : "default"}
        stateRelatedMessage={errorsPrimes[`${index}`]}
        hint="€"
      />
    ),
  ]);

  return (
    <div className="fr-container">
      <Table
        caption={
          <>
            <Html as="span">{title}</Html>
            {subTitle && <p className="fr-text--sm">{subTitle}</p>}
          </>
        }
        headers={tableHeaders}
        data={tableData}
      />
      {error && (
        <Alert severity="error" description={error} className="fr-mt-2w" />
      )}
      {note && <p className="fr-text--sm fr-mt-2w">{note}</p>}
    </div>
  );
};

export default SalaireTempsPlein;
