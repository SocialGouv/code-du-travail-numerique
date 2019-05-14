import React from "react";
import { Field } from "react-final-form";
import { Container } from "@cdt/ui";
import { OnChange } from "react-final-form-listeners";

import { YesNoQuestion } from "./components/YesNoQuestion";
import { Primes } from "./components/Primes";

function StepPrimes({ form }) {
  return (
    <Container narrow nopadding>
      <YesNoQuestion
        name="hasPrimes"
        label="Avez-vous perçu des primes annuelles ou exceptionnelles au cours des 3 derniers mois&nbsp;?"
      />
      <OnChange name="hasPrimes">
        {hasPrimes => {
          hasPrimes
            ? form.change("primes", [{ prime: null }])
            : form.change("primes", []);
        }}
      </OnChange>
      <br />
      <br />
      <Field name="hasPrimes">
        {({ input }) => (
          <>{input.value === true ? <Primes name="primes" /> : null}</>
        )}
      </Field>
      <OnChange name="primes">
        {primes => {
          if (primes.length === 0) {
            form.change("hasPrimes", false);
          }
        }}
      </OnChange>
    </Container>
  );
}

export { StepPrimes };
