import React from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import { subMonths, format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { Table as UITable, theme, Toast } from "@cdt/ui";

import { parse } from "../../../../common/date";
import { Input, InlineError } from "../../../../common/stepStyles";
import { isNumber } from "../../../../common/validators";
import { YesNoQuestion } from "../../../components/YesNoQuestion";

export const Salaire = ({ form }) => {
  const data = form.getState().values;
  return (
    <>
      <Notice />
      <YesNoQuestion
        name="hasBrancheNewSalaire"
        label="De ce fait, avez-vous une modification à faire dans la déclaration de votre salaire&nbsp;?"
      />
      {data.hasBrancheNewSalaire && (
        <>
          <YesNoQuestion
            name="hasBrancheNewRegularSalaire"
            label="Avez-vous eu le même salaire lors des 12 derniers mois&nbsp;?"
            onChange={hasSameSalaire => {
              if (hasSameSalaire) {
                form.change("brancheNewIrregularSalaire", undefined);
              } else {
                form.change(
                  "brancheNewIrregularSalaire",
                  Array.from({ length: 12 }).map((_, index) => ({
                    label: format(
                      subMonths(parse(data.dateSortie), index),
                      "MMMM yyyy",
                      {
                        locale: frLocale
                      }
                    ),
                    salary: null
                  }))
                );
                form.change("brancheNewRegularSalaire", undefined);
              }
            }}
          />
          {data.hasBrancheNewRegularSalaire === true && (
            <RegularNewSalaire name="brancheNewRegularSalaire" />
          )}

          <IrregularNewSalaire name="brancheNewIrregularSalaire" />
        </>
      )}
    </>
  );
};

const RegularNewSalaire = ({ name }) => (
  <>
    <Field
      name={name}
      validate={isNumber}
      subscription={{
        value: true,
        error: true,
        touched: true,
        invalid: true
      }}
    >
      {({ input, meta: { touched, error, invalid } }) => (
        <>
          <p>Salaire mensuel ajusté (primes et temps partiel inclus)</p>
          <CurrencyWrapper>
            <NumberInput
              {...input}
              size="10"
              type="number"
              invalid={touched && invalid}
            />
            <Currency aria-hidden="true">€</Currency>
          </CurrencyWrapper>
          {error && touched && invalid && <InlineError>{error}</InlineError>}
        </>
      )}
    </Field>
  </>
);

const IrregularNewSalaire = ({ name }) => (
  <>
    <FieldArray name={name}>
      {({ fields }) =>
        fields.length > 0 && (
          <Table>
            <thead>
              <tr>
                <th>Mois</th>
                <th>Salaire mensuel ajusté (primes et temps partiel inclus)</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((name, index) => (
                <tr key={name}>
                  <td>
                    <label htmlFor={`salaire${index}`}>
                      {fields.value[index].label}
                    </label>
                  </td>
                  <td>
                    <Field
                      name={`${name}.salary`}
                      validate={isNumber}
                      formatOnBlur
                      format={value => {
                        // Hack auto fill
                        fields.value.forEach((field, fieldIndex) => {
                          if (
                            fieldIndex > index &&
                            fields.value[fieldIndex].salary === null
                          ) {
                            fields.value[fieldIndex].salary =
                              parseFloat(value) || null;
                          }
                        });
                        return parseFloat(value) || null;
                      }}
                      subscription={{
                        value: true,
                        error: true,
                        touched: true,
                        invalid: true
                      }}
                      render={({
                        input,
                        meta: { touched, error, invalid }
                      }) => (
                        <>
                          <CurrencyWrapper>
                            <NumberInput
                              {...input}
                              size="10"
                              type="number"
                              id={`salaire${index}`}
                              invalid={touched && invalid}
                            />
                            <Currency aria-hidden="true">€</Currency>
                          </CurrencyWrapper>
                          {error && touched && invalid && (
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
        )
      }
    </FieldArray>
  </>
);

const Notice = () => (
  <>
    <p>Le salaire à renseigner pour cette convention collective inclut:</p>
    <ul>
      <li>les primes prévues au contrat de travail</li>
    </ul>
    <strong>mais elle exclut</strong>:
    <ul>
      <li>
        les heures supplémentaires au delà de l’heure normale de l’entreprise
      </li>
      <li>
        les majorations/indemnités liées à un déplacement ou un détachement
      </li>
    </ul>
    <StyledToast variant="warning">
      Attention, les éventuelles <strong>primes</strong> renseignées
      précédemment ne seront pas prises en compte dans le calcul de l’indemnité
      de votre convention collective. Si vous en avez perçues, merci de les
      intégrer à votre rémunération ci-après.
      <br />
      Aussi, si il y en a, les mois effectués en <strong>
        temps partiel
      </strong>{" "}
      sont à considérer comme ceux effectués en temps plein.
    </StyledToast>
  </>
);

const { colors, spacing } = theme;

const StyledToast = styled(Toast)`
  margin-top: ${spacing.interComponent};
`;

const Table = styled(UITable)`
  & tr > td:nth-child(2) {
    text-align: left;
    width: 70%;
  }
`;
const NumberInput = styled(Input)`
  text-align: right;
  padding-right: ${spacing.base};
`;

const CurrencyWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-right: ${spacing.interComponent};
`;

const Currency = styled.span`
  color: ${colors.grey};
  position: absolute;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
`;
