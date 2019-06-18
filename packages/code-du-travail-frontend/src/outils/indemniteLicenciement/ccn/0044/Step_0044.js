import React from "react";
import { Field } from "react-final-form";
import { Container } from "@cdt/ui";
import { EchelonChimie } from "./EchelonChimie";
//import { TextQuestion } from "../../components/TextQuestion";
import { YesNoQuestion } from "../../components/YesNoQuestion";
import { TextQuestion } from "../../components/TextQuestion";

function Step_Chimie() {
  return (
    <Container>
      <h3>Chimie</h3>
      <EchelonChimie name="groupe" />

      <Field name="anciennete">
        {({ input }) => {
          const anciennete = Math.floor(input.value);
          if ((anciennete >= 1 && anciennete < 2) || anciennete > 5) {
            return (
              <>
                <YesNoQuestion
                  name="hasOpe"
                  label="Est ce que votre entreprise est affiliée à une des organisations patronales employeur&nbsp;?"
                />
                <YesNoQuestion
                  name="isEco"
                  label="Le motif de votre licenciement est-il économique ?"
                />
                {anciennete > 5 && (
                  <TextQuestion
                    inputType="number"
                    name="age"
                    label="Quel etait votre age à la date du licenciement ?"
                  />
                )}
              </>
            );
          }
          return null;
        }}
      </Field>
    </Container>
  );
}

export default Step_Chimie;
