import { icons, Input, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { InlineError } from "../../../../common/ErrorField";
import { Question } from "../../../../common/Question";
import { SmallText } from "../../../../common/stepStyles";
import { ErrorWrapper } from "../../../../Components/TextQuestion";

export type SalaryPeriods = {
  month: string;
  value: number | undefined;
};

type Props = {
  salaryPeriods: SalaryPeriods[];
  onSalariesChange: (salaries: SalaryPeriods[]) => void;
  error?: string;
};

export const SalaireTempsPlein = ({
  salaryPeriods,
  onSalariesChange,
  error,
}: Props): JSX.Element => {
  const [isFirstEdit, setIsFirstEdit] = React.useState(true);
  const [salariesPeriod, setLocalSalaries] =
    React.useState<SalaryPeriods[]>(salaryPeriods);
  const [errorsSalaries, setErrorsSalaries] = React.useState({});

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

  return (
    <>
      <Table>
        <Caption>
          <Question required>Salaire mensuel brut</Question>
          <SmallText>
            Prendre en compte les salaires et avantages en nature.
          </SmallText>
        </Caption>
        <thead>
          <tr>
            <Th>Mois</Th>
            <Th>Salaire mensuel brut</Th>
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
                  } (prendre en compte les salaires et avantages en nature)`}
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
            </tr>
          ))}
        </tbody>
      </Table>
      {error && (
        <StyledInlineWrapperError>
          <InlineError>{error}</InlineError>
        </StyledInlineWrapperError>
      )}
    </>
  );
};

export default SalaireTempsPlein;

const { fonts, breakpoints, spacings } = theme;

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
