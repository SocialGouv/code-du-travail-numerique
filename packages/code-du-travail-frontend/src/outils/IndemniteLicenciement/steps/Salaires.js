import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "react-final-form";
import { theme } from "@socialgouv/react-ui";
import { differenceInMonths, subMonths, format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { Input } from "../../common/stepStyles";
import { Error } from "../../common/ErrorField";
import { isNumber } from "../../common/validators";
import { parse } from "../../common/date";
import { YesNoQuestion } from "../../common/YesNoQuestion";
import {
  SalaireTempsPartiel,
  TEMPS_PARTIEL,
  TEMPS_PLEIN
} from "../components/SalaireTempsPartiel";
import { SalaireTempsPlein } from "../components/SalaireTempsPlein";
import { motifs } from "../components/AbsencePeriods";
import { Question } from "../../common/Question";

function StepSalaires({ form }) {
  return (
    <>
      <YesNoQuestion
        name="hasTempsPartiel"
        label="Y a-t-il eu des périodes d'alternance à temps plein et à temps partiel durant le contrat de travail&nbsp;?"
        onChange={hasTempsPartiel => {
          if (hasTempsPartiel) {
            form.batch(() => {
              form.change("salairePeriods", [
                { type: TEMPS_PLEIN, duration: null, salary: null },
                { type: TEMPS_PARTIEL, duration: null, salary: null }
              ]);
              form.change("salaire", null);
              form.change("salaires", []);
              form.change("hasSameSalaire", null);
            });
          } else {
            form.change("salairePeriods", []);
          }
        }}
      />
      <Field name="hasTempsPartiel">
        {({ input }) => (
          <>
            <SalaireTempsPartiel
              name="salairePeriods"
              visible={input.value}
              onChange={salairePeriods => {
                if (salairePeriods.length === 0) {
                  form.change("hasTempsPartiel", false);
                }
              }}
            />

            {input.value === false && (
              <>
                <YesNoQuestion
                  name="hasSameSalaire"
                  label="Le salaire mensuel a-t-il été le même durant les 12 derniers mois&nbsp;?"
                  onChange={hasSameSalaire => {
                    if (hasSameSalaire) {
                      form.change("salaires", []);
                    } else {
                      form.batch(() => {
                        const { values } = form.getState();
                        form.change("salaires", getSalairesPeriods(values));
                        form.change("salaire", null);
                      });
                    }
                  }}
                />
                <Field name="hasSameSalaire">
                  {({ input }) => (
                    <>
                      {input.value && (
                        <Field
                          name="salaire"
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
                              <Question required>
                                Quel a été le montant du salaire mensuel
                                brut&nbsp;?
                              </Question>

                              <CurrencyWrapper>
                                <NumberInput
                                  {...input}
                                  size="10"
                                  type="number"
                                  invalid={touched && invalid}
                                />
                                <Currency aria-hidden="true">€</Currency>
                              </CurrencyWrapper>
                              <span>
                                Prendre en compte les primes et avantages en
                                nature.
                              </span>
                              {error && touched && invalid ? (
                                <Error>{error}</Error>
                              ) : null}
                            </>
                          )}
                        </Field>
                      )}
                      <SalaireTempsPlein name="salaires" />
                    </>
                  )}
                </Field>
              </>
            )}
          </>
        )}
      </Field>
    </>
  );
}

function getSalairesPeriods({ dateEntree, dateSortie, absencePeriods }) {
  const dEntree = parse(dateEntree);
  const dSortie = parse(dateSortie);

  const totalAbsence = (absencePeriods || [])
    .filter(period => Boolean(period.duration))
    .reduce((total, item) => {
      const motif = motifs.find(motif => motif.label === item.type);
      return total + item.duration * motif.value;
    }, 0);

  const nbMonthes = Math.min(
    differenceInMonths(dSortie, dEntree) - totalAbsence,
    12
  );

  return Array.from({ length: nbMonthes }).map((_, index) => {
    return {
      label: format(subMonths(dSortie, index), "MMMM yyyy", {
        locale: frLocale
      }),
      salary: null
    };
  });
}

StepSalaires.propTypes = {
  form: PropTypes.object.isRequired
};

export { StepSalaires, getSalairesPeriods };

const { colors, spacings } = theme;

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
