import React from "react";
import { TypeRemuneration } from "../components/TypeRemuneration";
import { Field } from "react-final-form";
import { CurrencyField } from "../../common/CurrencyField";
import { theme } from "@cdt/ui";
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
        {({ input }) => {
          if (input.value === "total") {
            return (
              <>
                <CurrencyField
                  name="salaire"
                  label="Indiquez votre rémunération totale brute perçue pendant votre contrat&nbsp;*"
                />
                <Info>
                  * Majorations, indemnités, primes et accessoires compris sauf
                  les remboursements de frais et l’indemnité de congés payés.
                </Info>
              </>
            );
          } else if (input.value === "mensuel") {
            return (
              <>
                <Salaires
                  name="salaires"
                  onChange={salaires => {
                    if (salaires.length === 0) {
                      form.change("typeRemuneration", "total");
                    }
                  }}
                />
                <Info>
                  * Majorations, indemnités, primes et accessoires compris sauf
                  les remboursements de frais et l’indemnité de congés payés.
                </Info>
              </>
            );
          } else {
            return null;
          }
        }}
      </Field>
    </>
  );
}

export { StepRemuneration };

const { fonts } = theme;

const Info = styled.p`
  font-style: italic;
  font-size: ${fonts.sizeSmall};
`;
