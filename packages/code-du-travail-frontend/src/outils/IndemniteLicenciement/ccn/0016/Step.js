import React from "react";

import { TextQuestion } from "../../../common/TextQuestion";
import { YesNoQuestion } from "../../../common/YesNoQuestion";
import { CADRE, Categorie } from "./Categorie";
import { CategoriePeriod } from "./CategoriePeriod";

function Step({ form }) {
  const state = form.getState();
  const { anciennete = 0, age = 0, categorie = "" } = state.values;
  const askDetailedCategories = anciennete >= 3 && categorie === CADRE;

  return (
    <>
      <Categorie name="categorie" />
      {askDetailedCategories && <CategoriePeriod />}
      <TextQuestion
        inputType="number"
        name="age"
        label="Quel est l'âge du salarié à la date du licenciement&nbsp;?"
      />
      {age > 60 && (
        <YesNoQuestion
          label="Le salarié pourrait-il bénéficier de la retraite&nbsp;?"
          name="hasRetirementAge"
        />
      )}
    </>
  );
}

export { Step };
