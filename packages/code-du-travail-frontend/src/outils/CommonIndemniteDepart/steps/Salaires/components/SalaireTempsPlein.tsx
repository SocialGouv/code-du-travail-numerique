import { icons, Input, theme } from "@socialgouv/cdtn-ui";
import { SalaryPeriods } from "@socialgouv/modeles-social";
import React from "react";
import styled from "styled-components";
import Html from "../../../../../common/Html";

import { InlineError } from "../../../../common/ErrorField";
import { Question, Tooltip } from "../../../../common/Question";
import { SmallText } from "../../../../common/stepStyles";
import { ErrorWrapper } from "../../../../Components/TextQuestion";

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

  return (
    <StyledDiv>
      <Table>
        <Caption>
          <Question required tooltip={tooltip}>
            <Html as="span">{title}</Html>
          </Question>
          {subTitle && <SmallText>{subTitle}</SmallText>}
        </Caption>
        <thead>
          <tr>
            <Th scope="col">Mois</Th>
            <Th scope="col">Salaire mensuel brut</Th>
            {!noPrime && <Th scope="col">Dont primes</Th>}
          </tr>
        </thead>
        <tbody>
          {salaryPeriods.map((sPeriod, index) => (
            <tr key={sPeriod.month + index}>
              <th scope="row">
                <label htmlFor={`salary.${index}`}>{sPeriod.month}</label>
              </th>
              <td>
                <Input
                  id={`salary.${index}`}
                  name={`salary.${index}`}
                  title={`Salaire mensuel brut en € pour le mois ${
                    index + 1
                  } (prendre en compte les primes et avantages en nature)`}
                  type="number"
                  invalid={errorsSalaries[`${index}`]}
                  value={sPeriod.value ?? ""}
                  text="€"
                  onChange={(e) => onChangeSalaries(index, e.target.value)}
                  onBlur={() => setIsFirstEdit(false)}
                  data-testid={dataTestidSalaries ?? "salary-input"}
                  autoFocus={autoFocus ? index === 0 : false}
                />
                {errorsSalaries[`${index}`] && (
                  <ErrorWrapper>
                    <InlineError>{errorsSalaries[`${index}`]}</InlineError>
                  </ErrorWrapper>
                )}
              </td>
              <td>
                {index < 3 && !noPrime && (
                  <>
                    <Input
                      title={`Renseignez la prime exceptionnelle pour le mois ${index + 1} ici`}
                      id={`prime.${index}`}
                      name={`prime.${index}`}
                      type="number"
                      invalid={errorsPrimes[`${index}`]}
                      text="€"
                      onChange={(e) =>
                        onChangeLocalPrimes(index, e.target.value)
                      }
                      value={sPeriod.prime ?? ""}
                      updateOnScrollDisabled
                      data-testid={
                        dataTestidSalaries
                          ? "prime-" + dataTestidSalaries
                          : "prime-input"
                      }
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

  tbody {
    th {
      font-weight: normal;
    }
  }
`;

const Caption = styled.caption`
  text-align: left;
`;

const Th = styled.th`
  font-size: ${fonts.sizes.small};

  &:first-child {
    min-width: 100px;
  }
`;

const StyledInlineWrapperError = styled.div`
  margin-top: ${spacings.base};
`;
