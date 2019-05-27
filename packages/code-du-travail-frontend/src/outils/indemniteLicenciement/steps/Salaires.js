import React from "react";
import styled from "styled-components";
import { Field } from "react-final-form";
import { Container, theme } from "@cdt/ui";
import { differenceInMonths, subMonths, format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { Input } from "../stepStyles";
import { YesNoQuestion } from "../components/YesNoQuestion";
import {
  SalaireTempsPartiel,
  TEMPS_PARTIEL,
  TEMPS_PLEIN
} from "../components/SalaireTempsPartiel";
import { SalaireTempsPlein } from "../components/SalaireTempsPlein";
import { isNumber } from "../validators";
import { motifs } from "../components/AbsencePeriods";

function StepSalaires({ form }) {
  return (
    <>
      <Container nopadding>
        <YesNoQuestion
          name="hasTempsPartiel"
          label="Avez-vous alterné, au cours de votre contrat de travail des périodes
              de travail à temps plein et à temps partiel sur le même contrat&nbsp;?"
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
          {({ input }) =>
            input.value === true ? (
              <>
                <br />
                <br />
                <h2>Renseigner vos différentes périodes de travail</h2>
                <SalaireTempsPartiel
                  name="salairePeriods"
                  onChange={salairePeriods => {
                    if (salairePeriods.length === 0) {
                      form.change("hasTempsPartiel", false);
                    }
                  }}
                />
              </>
            ) : input.value === false ? (
              <>
                <YesNoQuestion
                  name="hasSameSalaire"
                  label="Avez-vous eu le même salaire lors des 12 derniers mois&nbsp;?"
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
                  {({ input }) =>
                    input.value === true ? (
                      <Field
                        name="salaire"
                        validate={isNumber}
                        subscribe={{ error: true, touched: true }}
                      >
                        {({ input, meta: { touched, error, invalid } }) => (
                          <>
                            <p>
                              Salaire mensuel brut (prendre en compte les primes
                              et avantages en natures)
                            </p>
                            <CurrencyWrapper>
                              <NumberInput
                                {...input}
                                size="10"
                                invalid={touched && invalid}
                              />
                              <Currency aria-hidden="true">€</Currency>
                            </CurrencyWrapper>
                            {error && touched && invalid ? (
                              <InlineError>{error}</InlineError>
                            ) : null}
                          </>
                        )}
                      </Field>
                    ) : input.value === false ? (
                      <SalaireTempsPlein name="salaires" />
                    ) : null
                  }
                </Field>
              </>
            ) : null
          }
        </Field>
      </Container>
    </>
  );
}

function getSalairesPeriods({ dateEntree, dateSortie, absencePeriods }) {
  const dEntree = new Date(dateEntree);
  const dSortie = new Date(dateSortie);

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
      label: format(subMonths(dSortie, index), "MMMM YYYY", {
        locale: frLocale
      }),
      salaire: null
    };
  });
}
export { StepSalaires };

const { colors, fonts, spacing } = theme;

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

const InlineError = styled.span`
  font-weight: 600;
  font-size: ${fonts.sizeSmall};
  color: ${colors.darkerGrey};
`;
