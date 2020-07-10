import { Title } from "@socialgouv/cdtn-react-ui";
import React from "react";
import { Field } from "react-final-form";

import { TextQuestion } from "../../../common/TextQuestion";
import { YesNoQuestion } from "../../../common/YesNoQuestion";
import { EchelonChimie } from "./EchelonChimie";

function Step() {
  return (
    <>
      <Title as="h3">Chimie</Title>
      <EchelonChimie name="groupe" />

      <Field name="anciennete">
        {({ input }) => {
          const anciennete = Math.floor(input.value);
          if ((anciennete >= 1 && anciennete < 2) || anciennete > 5) {
            return (
              <>
                <YesNoQuestion
                  name="hasOpe"
                  label="Est-ce que l'entreprise est affiliée à une des organisations patronales employeur&nbsp;?"
                />
                <YesNoQuestion
                  name="isEco"
                  label="Le motif du licenciement est-il économique ?"
                />
                {anciennete > 5 && (
                  <TextQuestion
                    inputType="number"
                    name="age"
                    label="Quel était l’âge du salarié à la date du licenciement ?"
                  />
                )}
              </>
            );
          }
          return null;
        }}
      </Field>
    </>
  );
}

export { Step };
