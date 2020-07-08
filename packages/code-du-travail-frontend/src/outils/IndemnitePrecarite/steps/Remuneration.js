import React from "react";
import { Field } from "react-final-form";

import { CurrencyField } from "../../common/CurrencyField";
import { SmallText } from "../../common/stepStyles";
import { Salaires } from "../components/Salaires";
import { TypeRemuneration } from "../components/TypeRemuneration";

function StepRemuneration({ form }) {
  return (
    <>
      <TypeRemuneration
        name="typeRemuneration"
        onChange={(typeRemuneration) => {
          typeRemuneration === "mensuel"
            ? form.change("salaires", [{ salaire: null }, { salaire: null }])
            : form.change("salaires", []);
        }}
      />
      <Field name="typeRemuneration">
        {({ input }) => (
          <>
            {input.value === "total" && (
              <>
                <CurrencyField
                  name="salaire"
                  label="Quelle est la rémunération totale brute perçue durant le contrat de travail&nbsp;?"
                />
              </>
            )}
            <Salaires
              visible={input.value === "mensuel"}
              name="salaires"
              onChange={(salaires) => {
                if (salaires.length === 0) {
                  form.change("typeRemuneration", "total");
                }
              }}
            />

            {["mensuel", "total"].includes(input.value) && (
              <SmallText>
                Majorations, indemnités, primes et accessoires compris sauf les
                remboursements de frais et l’indemnité de congés payés.
              </SmallText>
            )}
          </>
        )}
      </Field>
    </>
  );
}

export { StepRemuneration };
