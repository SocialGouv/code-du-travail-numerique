import { CatPro3239 } from "@socialgouv/modeles-social";

export const getResultMessage = (
  informations?: Record<string, any>
): string => {
  let isAssMat = false;
  if (informations) {
    const categoryPro3239 =
      informations[
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle"
        ];
    isAssMat = categoryPro3239 === CatPro3239.assistantMaternel;
  }
  if (isAssMat)
    return "À partir des éléments que vous avez saisis, l’indemnité de rupture conventionnelle (appelée « indemnité de rupture » pour les assistants maternels) est estimée à :";
  return "À partir des éléments que vous avez saisis, l’indemnité de rupture conventionnelle est estimée à :";
};
