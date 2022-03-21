import { icons, Input } from "@socialgouv/cdtn-ui";
import { differenceInMonths, format, subMonths } from "date-fns";
import frLocale from "date-fns/locale/fr";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Field } from "react-final-form";

import { Error } from "../../common/ErrorField";
import { Question } from "../../common/Question";
import { SmallText } from "../../common/stepStyles";
import { parse } from "../../common/utils/";
import { isNumber } from "../../common/validators";
import { YesNoQuestion } from "../../common/YesNoQuestion";
import { MOTIFS } from "../components/AbsencePeriods";
import { SalaireTempsPlein } from "../components/SalaireTempsPlein";

function StepSalaires({ form }) {
  const [hasTempsPartiel, setHasTempsPartiel] = useState(false);

  return (
    <>
      <YesNoQuestion
        name="hasTempsPartiel"
        label="Y a-t-il eu des périodes d'alternance à temps plein et à temps partiel durant le contrat de travail&nbsp;?"
        onChange={(value) => {
          setHasTempsPartiel(value);
        }}
      />
      {hasTempsPartiel && (
        <Error>
          <p>
            Le calcul de l’indemnité de licenciement dans le cas d’une
            alternance de temps plein et de temps partiel est actuellement en
            cours de développement.
          </p>
          <p>
            Les périodes à temps partiel ne sont actuellement pas prise en
            compte dans le calcul.
          </p>
        </Error>
      )}
      <Field name="hasTempsPartiel">
        {({ input }) => (
          <>
            {input.value === false && (
              <>
                <YesNoQuestion
                  name="hasSameSalaire"
                  label="Le salaire mensuel brut a-t-il été le même durant les 12 derniers mois précédant la notification du licenciement&nbsp;?"
                  onChange={(hasSameSalaire) => {
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
                            error: true,
                            invalid: true,
                            touched: true,
                            value: true,
                          }}
                        >
                          {({ input, meta: { touched, error, invalid } }) => (
                            <>
                              <Question required htmlFor="salaire">
                                Quel a été le montant du salaire mensuel
                                brut&nbsp;?
                              </Question>
                              <SmallText>
                                Prendre en compte les primes et avantages en
                                nature.
                              </SmallText>
                              <Input
                                {...input}
                                type="number"
                                invalid={touched && invalid}
                                icon={icons.Euro}
                              />
                              {error && touched && invalid && (
                                <Error>{error}</Error>
                              )}
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

function getSalairesPeriods({ dateEntree, dateNotification, absencePeriods }) {
  const dEntree = parse(dateEntree);
  const dNotification = parse(dateNotification);

  const totalAbsence = (absencePeriods || [])
    .filter((period) => Boolean(period.duration))
    .reduce((total, item) => {
      const motif = MOTIFS.find((motif) => motif.label === item.type);
      return total + item.duration * motif.value;
    }, 0);

  const nbMonthes = Math.min(
    differenceInMonths(dNotification, dEntree) - totalAbsence,
    12
  );
  return Array.from({ length: nbMonthes }).map((_, index) => {
    return {
      label: format(subMonths(dNotification, index + 1), "MMMM yyyy", {
        locale: frLocale,
      }),
      salary: null,
    };
  });
}

StepSalaires.propTypes = {
  form: PropTypes.object.isRequired,
};

export { getSalairesPeriods, StepSalaires };
