import React from "react";
import { Alert } from "@cdt/ui";
import { Field } from "react-final-form";

import { TypeContrat } from "../components/TypeContrat";
import { QuestionLabel } from "../../common/stepStyles";
import { YesNoQuestion } from "../../IndemniteLicenciement/components/YesNoQuestion";

function StepInfosGenerales() {
  return (
    <>
      <TypeContrat name="contrat" />
      <Field name="contrat">
        {({ input }) => {
          switch (input.value) {
            case "cdd":
              return (
                <>
                  <QuestionLabel as="p">
                    Votre type de CDD fait-il partie de la liste suivante :
                  </QuestionLabel>
                  <ul>
                    <li>CDD saisonnier ou CDD d’usage</li>
                    <li>
                      Contrat unique d’insertion (CUI) ou Parcours emploi
                      compétences (PEC)
                    </li>
                    <li>
                      Contrat de professionnalisation ou Contrat d’apprentissage
                    </li>
                    <li>
                      CDD conclu avec un jeune (mineur ou majeur) pendant ses
                      vacances scolaires ou universitaires
                    </li>
                    <li>
                      Contrat pour lequel l’employeur s’est engagé à assurer un
                      complément de formation professionnelle au salarié
                    </li>
                    <li>CCD dans le cadre d’un congé de mobilité</li>
                  </ul>
                  <YesNoQuestion label="" name="typeCdd" />
                </>
              );
            case "ctt":
              return (
                <>
                  <YesNoQuestion
                    label="Avez vous un contrat de mission-formation"
                    name="cttFormation"
                  />
                  <Field name="cttFormation">
                    {({ input }) =>
                      input.value === false ? (
                        <Alert variant="info">
                          Attention : si vous avez un contrat de travail
                          temporaire (contrat d’intérim) saisonnier ou d’usage,
                          un accord d’entreprise ou d’établissement peut
                          dispenser votre entreprise de travail temporaire
                          (l’entreprise d’intérim) de vous verser une indemnité
                          de précarité.
                        </Alert>
                      ) : null
                    }
                  </Field>
                </>
              );
            default:
              return null;
          }
        }}
      </Field>
    </>
  );
}
StepInfosGenerales.validate = function(values) {
  const errors = {};
  if (values.typeCdd === true) {
    errors.typeCdd =
      "Votre type de contrat ne vous permet pas d’avoir droit à une prime de précarité. ";
  }
  if (values.cttFormation === true) {
    errors.cttFormation =
      " Votre type de contrat ne vous permet pas d’avoir droit à une prime de précarité.";
  }
  return errors;
};
export { StepInfosGenerales };
