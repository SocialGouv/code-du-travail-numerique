import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { YesNoQuestion } from "../../common/YesNoQuestion";
import { Primes } from "../components/Primes";

function StepPrimes({ form }) {
  return (
    <>
      <YesNoQuestion
        name="hasPrimes"
        label="Des primes annuelles ou exceptionnelles ont-elles été perçues au cours des 3 derniers mois&nbsp;?"
        onChange={hasPrimes => {
          hasPrimes
            ? form.change("primes", [{ prime: null }])
            : form.change("primes", []);
        }}
      />
      <br />
      <br />
      <Field name="hasPrimes">
        {({ input }) => (
          <Primes
            name="primes"
            visible={input.value}
            onChange={primes => {
              if (primes.length === 0) {
                form.change("hasPrimes", false);
              }
            }}
          />
        )}
      </Field>
    </>
  );
}
StepPrimes.propTypes = {
  form: PropTypes.object.isRequired
};

export { StepPrimes };
