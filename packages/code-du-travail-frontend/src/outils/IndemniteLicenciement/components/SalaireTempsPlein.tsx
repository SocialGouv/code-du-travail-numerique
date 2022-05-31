import { icons, Input, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";
import styled from "styled-components";

import { InlineError } from "../../common/ErrorField";
import { Question } from "../../common/Question";
import { SmallText } from "../../common/stepStyles";
import { isNumber } from "../../common/validators";

type Props = {
  salaryPeriods: any[];
  onSalariesChange: (value: string, index: number) => void;
};

export const SalaireTempsPlein = ({
  salaryPeriods,
  onSalariesChange,
}: Props): JSX.Element => (
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
      </tr>
    </thead>
    <tbody>
      {salaryPeriods.map((label, index) => (
        <tr key={label + index}>
          <td>
            <label htmlFor={`salaries${index}`}>{label}</label>
          </td>
          <td>
            // TODO fix the auto fill here & in onSalariesChange
            <Field
              name={`salaries[${index}]`}
              // value={`salaries[${index}]`}
              validate={isNumber}
              // formatOnBlur
              // format={(value) => (isFinite(value) ? parseFloat(value) : null)}
              subscription={{
                error: true,
                invalid: true,
                touched: true,
                value: true,
              }}
              render={({ input, meta: { touched, error, invalid } }) => (
                <>
                  <Input
                    {...input}
                    title={`Salaire mensuel brut pour le mois ${
                      index + 1
                    } (prendre en compte les primes et avantages en nature)`}
                    type="number"
                    id={`salary${index}`}
                    invalid={touched && invalid}
                    icon={icons.Euro}
                    updateOnScrollDisabled
                    onChange={(value) => {
                      console.log("onSalariesChange");
                      return onSalariesChange(value, index);
                    }}
                  />
                  {(error && touched && invalid) ?? (
                    <InlineError>{error}</InlineError>
                  )}
                </>
              )}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default SalaireTempsPlein;

const { fonts, breakpoints } = theme;

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
