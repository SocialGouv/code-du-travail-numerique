import React from "react";
import { TypeRemuneration } from "../components/TypeRemuneration";
import { Field } from "react-final-form";
import { CurrencyField } from "../../common/CurrencyField";
import { theme } from "@socialgouv/react-ui";
import styled from "styled-components";
import { Salaires } from "../components/Salaires";

function StepRemuneration({ form }) {
  return (
    <>
      <TypeRemuneration
        name="typeRemuneration"
        onChange={typeRemuneration => {
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
                  label="Indiquez votre rémunération totale brute perçue pendant votre contrat&nbsp;*"
                />
              </>
            )}
            <Salaires
              visible={input.value === "mensuel"}
              name="salaires"
              onChange={salaires => {
                if (salaires.length === 0) {
                  form.change("typeRemuneration", "total");
                }
              }}
            />

            {["mensuel", "total"].includes(input.value) && (
              <Info>
                * Majorations, indemnités, primes et accessoires compris sauf
                les remboursements de frais et l’indemnité de congés payés.
              </Info>
            )}
          </>
        )}
      </Field>
    </>
  );
}

export { StepRemuneration };

const { fonts } = theme;

const Info = styled.p`
  font-size: ${fonts.sizeSmall};
  font-style: italic;
`;
