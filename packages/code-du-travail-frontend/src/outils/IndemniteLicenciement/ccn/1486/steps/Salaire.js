import { Input, Table as UITable, theme, Toast } from "@socialgouv/cdtn-ui";
import { format, subMonths } from "date-fns";
import frLocale from "date-fns/locale/fr";
import React from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";

import { InlineError } from "../../../../common/ErrorField";
import { parse } from "../../../../common/utils";
import { isNumber } from "../../../../common/validators";
import { YesNoQuestion } from "../../../../common/YesNoQuestion";

export const Salaire = ({ form }) => {
  const data = form.getState().values;
  return (
    <>
      <Notice />
      <YesNoQuestion
        name="hasBrancheNewSalaire"
        label="De ce fait, avez-vous une modification à faire dans la déclaration du salaire&nbsp;?"
      />
      {data.hasBrancheNewSalaire && (
        <>
          <YesNoQuestion
            name="hasBrancheNewRegularSalaire"
            label="Le salaire mensuel a-t-il été le même durant les 12 derniers mois&nbsp;?"
            onChange={(hasSameSalaire) => {
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
                        locale: frLocale,
                      }
                    ),
                    salary: null,
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
        error: true,
        invalid: true,
        touched: true,
        value: true,
      }}
    >
      {({ input, meta: { touched, error, invalid } }) => (
        <>
          <p>Salaire mensuel ajusté (primes et temps partiel inclus)</p>
          <CurrencyWrapper>
            <NumberInput
              {...input}
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
                      format={(value) => {
                        // Hack auto fill
                        fields.value.forEach((field, fieldIndex) => {
                          if (
                            fieldIndex > index &&
                            fields.value[fieldIndex].salary === null
                          ) {
                            fields.value[fieldIndex].salary = isFinite(value)
                              ? parseFloat(value)
                              : null;
                          }
                        });
                        return isFinite(value) ? parseFloat(value) : null;
                      }}
                      subscription={{
                        error: true,
                        invalid: true,
                        touched: true,
                        value: true,
                      }}
                      render={({
                        input,
                        meta: { touched, error, invalid },
                      }) => (
                        <>
                          <CurrencyWrapper>
                            <NumberInput
                              {...input}
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
    <StyledToast>
      Attention, les éventuelles <strong>primes</strong> renseignées
      précédemment ne seront pas prises en compte dans le calcul de l’indemnité
      de la convention collective. Si des primes ont été perçues, merci de les
      intégrer à la rémunération ci-après.
      <br />
      Aussi, si il y en a, les mois effectués en <strong>
        temps partiel
      </strong>{" "}
      sont à considérer comme ceux effectués en temps plein.
    </StyledToast>
  </>
);

const { colors, spacings } = theme;

const StyledToast = styled(Toast)`
  margin-top: ${spacings.medium};
`;

const Table = styled(UITable)`
  & tr > td:nth-child(2) {
    width: 70%;
    text-align: left;
  }
`;
const NumberInput = styled(Input)`
  padding-right: ${spacings.base};
  text-align: right;
`;

const CurrencyWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: ${spacings.medium};
`;

const Currency = styled.span`
  position: absolute;
  top: 50%;
  right: 0.25rem;
  color: ${colors.altText};
  transform: translateY(-50%);
`;
