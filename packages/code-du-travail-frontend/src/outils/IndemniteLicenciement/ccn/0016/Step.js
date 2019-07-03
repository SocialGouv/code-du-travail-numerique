import React from "react";
import { Container } from "@cdt/ui";
import { TextQuestion } from "../../components/TextQuestion";
import { Categorie, CADRE } from "./Categorie";
import { YesNoQuestion } from "../../components/YesNoQuestion";
import { CategoriePeriod } from "./CategoriePeriod";

function Step({ form }) {
  const state = form.getState();
  const { anciennete = 0, age = 0, categorie = "" } = state.values;
  const askDetailedCategories = anciennete >= 3 && categorie === CADRE;

  return (
    <Container>
      <Categorie name="categorie" />
      {askDetailedCategories && <CategoriePeriod />}
      <TextQuestion
        inputType="number"
        name="age"
        size="5"
        label="Quel etait votre âge à la date du licenciement ?"
      />
      {age > 60 && (
        <YesNoQuestion
          label="Le salarié pourrait-il bénéficier de la retraite ?"
          name="hasRetirementAge"
        />
      )}
    </Container>
  );
}

export { Step };
