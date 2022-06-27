import { icons, Input, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { InlineError } from "../../../../common/ErrorField";
import { Question } from "../../../../common/Question";
import { SmallText } from "../../../../common/stepStyles";
import { ErrorWrapper } from "../../../../Components/TextQuestion";
import { Prime, SalaryPeriods } from "../../../common";

type Props = {
  salaryPeriods: SalaryPeriods[];
  onSalariesChange: (salaries: SalaryPeriods[]) => void;
  error?: string;
  primes: Prime[];
  onChangePrimes: (primes: Prime[]) => void;
};

export const SalaireTempsPlein = ({
  salaryPeriods,
  onSalariesChange,
  primes,
  onChangePrimes,
  error,
}: Props): JSX.Element => {
  const [isFirstEdit, setIsFirstEdit] = React.useState(true);
  const [salariesPeriod, setLocalSalaries] =
    React.useState<SalaryPeriods[]>(salaryPeriods);
  const [errorsSalaries, setErrorsSalaries] = React.useState({});

  const [localPrimes, setLocalPrimes] = React.useState<Prime[]>(
    primes.length === 0 ? [null] : primes
  );
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
    const newLocalPrimes = localPrimes.map((p, i) => (i === index ? prime : p));
    setLocalPrimes(newLocalPrimes);
    onChangePrimes(newLocalPrimes);
  };

  return (
    <StyledDiv>
      <Table>
        <Caption>
          <Question required>Salaire mensuel brut</Question>
          <SmallText>
            Prendre en compte les primes et avantages en nature.
          </SmallText>
        </Caption>
        <thead>
          <tr>
            <Th>Mois</Th>
            <Th>Salaire mensuel brut</Th>
            <Th>dont prime</Th>
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
                  name={`salaries[${index}]`}
                  title={`Salaire mensuel brut pour le mois ${
                    index + 1
                  } (prendre en compte les primes et avantages en nature)`}
                  type="number"
                  id={`salary${index}`}
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
                      title={`Renseignez la prime pour le mois ${
                        index + 1
                      } ici`}
                      id={`prime-${index}`}
                      name={`${index}.prime`}
                      type="number"
                      error={errorsPrimes[`${index}`]}
                      icon={icons.Euro}
                      onChange={(e) =>
                        onChangeLocalPrimes(index, e.target.value)
                      }
                      value={localPrimes[index]}
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

  & tr > td:nth-child(2) {
    width: 80%;
    text-align: left;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    & tr > td:nth-child(2) {
      width: 60%;
    }
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
