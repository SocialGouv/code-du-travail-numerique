import { icons, Input, theme } from "@socialgouv/cdtn-ui";
import { SalaryPeriods } from "@socialgouv/modeles-social";
import React from "react";
import styled from "styled-components";

import { InlineError } from "../../../../common/ErrorField";
import { Question } from "../../../../common/Question";
import { SmallText } from "../../../../common/stepStyles";
import { ErrorWrapper } from "../../../../Components/TextQuestion";
<<<<<<< HEAD
=======
import { SalaryPeriods } from "../../../common";
>>>>>>> feat/indemnite-licenciement

type Props = {
  title: string;
  salaryPeriods: SalaryPeriods[];
  onSalariesChange: (salaries: SalaryPeriods[]) => void;
  error?: string;
  note?: string;
};

export const SalaireTempsPlein = ({
  salaryPeriods,
  onSalariesChange,
  error,
  title,
  note,
}: Props): JSX.Element => {
  const [isFirstEdit, setIsFirstEdit] = React.useState(true);
  const [salariesPeriod, setLocalSalaries] =
    React.useState<SalaryPeriods[]>(salaryPeriods);
  const [errorsSalaries, setErrorsSalaries] = React.useState({});
  const [errorsPrimes, setErrorsPrimes] = React.useState({});

  React.useEffect(() => {
    setLocalSalaries(salaryPeriods);
  }, [salaryPeriods]);

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
    let newLocalSalaries: SalaryPeriods[] = [];
    if (isFirstEdit) {
      newLocalSalaries = salariesPeriod.map((p, i) =>
        i >= index ? { ...p, value: salary } : p
      );
    } else {
      newLocalSalaries = salariesPeriod.map((p, i) =>
        i === index ? { ...p, value: salary } : p
      );
    }
    setLocalSalaries(newLocalSalaries);
    onSalariesChange(newLocalSalaries);
  };

  const onChangeLocalPrimes = (index: number, value: string) => {
    const prime = parseFloat(value);
    if (isNaN(prime) && value.length > 0) {
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
    const newLocalSalaries = salariesPeriod.map((p, i) =>
      i === index ? { ...p, prime } : p
    );
    setLocalSalaries(newLocalSalaries);
    onSalariesChange(newLocalSalaries);
  };

  return (
    <StyledDiv>
      <Table>
        <Caption>
<<<<<<< HEAD
          <Question required>{title}</Question>
=======
          <Question required>
            Indiquez le montant des salaires mensuels brut perçus au cours des
            12 mois précédents la notification du licenciement
          </Question>
>>>>>>> feat/indemnite-licenciement
          <SmallText>
            Renseignez le montant des salaires (en incluant les primes et
            avantages en nature) dans le premier champ et le montant des primes
            exceptionnelles dans le second champ.
          </SmallText>
        </Caption>
        <thead>
          <tr>
            <Th>Mois</Th>
            <Th>Salaire mensuel brut</Th>
            <Th>Dont primes exceptionnelles</Th>
          </tr>
        </thead>
        <tbody>
          {salariesPeriod.map((salaryPeriod, index) => (
            <tr key={salaryPeriod.month + index}>
              <td>
                <label htmlFor={`salaries${index}`}>{salaryPeriod.month}</label>
              </td>
              <td>
                <Input
                  id={`salary.${index}`}
                  name={`salary.${index}`}
                  title={`Salaire mensuel brut pour le mois ${
                    index + 1
                  } (prendre en compte les primes et avantages en nature)`}
                  type="number"
                  invalid={errorsSalaries[`${index}`]}
                  value={salaryPeriod.value}
                  icon={icons.Euro}
                  updateOnScrollDisabled
                  onChange={(e) => onChangeSalaries(index, e.target.value)}
                  onBlur={() => setIsFirstEdit(false)}
                />
                {errorsSalaries[`${index}`] && (
                  <ErrorWrapper>
                    <InlineError>{errorsSalaries[`${index}`]}</InlineError>
                  </ErrorWrapper>
                )}
              </td>
              <td>
                {index < 3 && (
                  <>
                    <Input
                      title={`Renseignez la prime exceptionnelle pour le mois ${
                        index + 1
                      } ici`}
                      id={`prime.${index}`}
                      name={`prime.${index}`}
                      type="number"
                      error={errorsPrimes[`${index}`]}
                      icon={icons.Euro}
                      onChange={(e) =>
                        onChangeLocalPrimes(index, e.target.value)
                      }
                      value={salaryPeriod.prime}
                      updateOnScrollDisabled
                    />
                    {errorsPrimes[`${index}`] && (
                      <ErrorWrapper>
                        <InlineError>{errorsPrimes[`${index}`]}</InlineError>
                      </ErrorWrapper>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {error && (
        <StyledInlineWrapperError>
          <InlineError>{error}</InlineError>
        </StyledInlineWrapperError>
      )}
      {note && <SmallText>{note}</SmallText>}
    </StyledDiv>
  );
};

export default SalaireTempsPlein;

const { fonts, breakpoints, spacings } = theme;

const StyledDiv = styled.div`
  margin-bottom: ${spacings.large};
`;

const Table = styled.table`
  width: 100%;
  text-align: left;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const Caption = styled.caption`
  text-align: left;
`;

const Th = styled.th`
  font-size: ${fonts.sizes.small};
`;

const StyledInlineWrapperError = styled.div`
  margin-top: ${spacings.base};
`;
