import React from "react";
import { Field } from "react-final-form";
import { Container } from "@cdt/ui";

import { YesNoQuestion } from "../components/YesNoQuestion";
import { Primes } from "../components/Primes";

function StepPrimes({ form }) {
  return (
    <Container nopadding>
      <YesNoQuestion
        name="hasPrimes"
        label="Avez-vous perçu des primes annuelles ou exceptionnelles au cours des 3 derniers mois&nbsp;?"
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
          <>
            {input.value === true ? (
              <Primes
                name="primes"
                onChange={primes => {
                  if (primes.length === 0) {
                    form.change("hasPrimes", false);
                  }
                }}
              />
            ) : null}
          </>
        )}
      </Field>
    </Container>
  );
}

export { StepPrimes };
