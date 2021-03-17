import { Input } from "@socialgouv/cdtn-ui";
import { format, isAfter } from "date-fns";
import PropTypes from "prop-types";
import Engine from "publicodes";
import React from "react";
import { Field } from "react-final-form";

import { parse } from "../../common/date";
import { Error, ErrorComputedField } from "../../common/ErrorField";
import { SectionTitle } from "../../common/stepStyles";
import { TextQuestion } from "../../common/TextQuestion";
import { isDate, isNumber } from "../../common/validators";
import rules from "../modele/index";

function validate({ dateEntree, dateSortie, dateNotification }) {
  const errors = {};
  const dEntree = parse(dateEntree);
  const dSortie = parse(dateSortie);
  const dNotification = parse(dateNotification);

  if (dateEntree && dateSortie && isAfter(dEntree, dSortie)) {
    errors.dateSortie = (
      <>
        La date de sortie doit se situer après le
        <strong> {format(dEntree, "dd MMMM yyyy")}</strong>
      </>
    );
  }

  if (dateNotification && dateSortie && isAfter(dNotification, dSortie)) {
    errors.dateNotification = `La date de notification doit se situer avant la date de sortie`;
  }
  if (dateNotification && dateEntree && isAfter(dEntree, dNotification)) {
    errors.dateNotification = `La date de notification doit se situer après la date d’entrée`;
  }
  return errors;
}

function StepAnciennete({ form }) {
  const engine = new Engine(rules);
  engine.setSituation({
    "contrat salarié . convention collective": `'IDCC${
      form.getState().values.ccn.num
    }'`,
  });
  const result = engine.evaluate("contrat salarié . ancienneté");

  const absences = Object.keys(result.missingVariables)
    .filter((item) => {
      return item.includes(" . absences . ");
    })
    .map((item) => {
      const rule = engine.getRule(item);
      return {
        title: rule.title,
        description: rule.rawNode.description,
        id: item,
      };
    });
  return (
    <>
      <SectionTitle>Dates d’entrée et de sortie de l’entreprise</SectionTitle>
      <TextQuestion
        name="contrat salarié . date embauche"
        label="Quelle est la date d’entrée dans l’entreprise&nbsp;?"
        inputType="date"
        validate={isDate}
        placeholder=" jj/mm/yyyy" // placeholder for safari desktop which does not support input type date
      />
      <TextQuestion
        name="contrat salarié . date rupture"
        label="Quelle est la date de sortie de l’entreprise&nbsp;?"
        inputType="date"
        validate={isDate}
        validateOnChange
        placeholder=" jj/mm/yyyy" // placeholder for safari desktop which does not support input type date
      />
      <ErrorComputedField name="anciennete" />
      <SectionTitle>Période d’absence prolongée</SectionTitle>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {absences.map((item) => (
          <div
            key={item}
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <span
              style={{
                flex: "2",
              }}
              title={item.description}
            >
              {item.title}
            </span>
            <Field
              style={{ flex: "1" }}
              name={`${item.id}`}
              validate={isNumber}
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
                    id={`${item.id}`}
                    type="number"
                    invalid={touched && invalid}
                  />
                  {error && touched && invalid && <Error>{error}</Error>}
                </>
              )}
            />
          </div>
        ))}
      </div>
    </>
  );
}

StepAnciennete.validate = validate;

StepAnciennete.propTypes = {
  form: PropTypes.object.isRequired,
};

export { StepAnciennete };
