import { CatPro3239 } from "@socialgouv/modeles-social";

export const getMessageMotifExample = (
  informations?: Record<string, any>
): string => {
  let isAssMat = false;
  let isSalariePartEmployeur = false;
  if (informations) {
    const categoryPro3239 =
      informations[
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle"
      ];
    isAssMat = categoryPro3239 === `'${CatPro3239.assistantMaternel}'`;
    isSalariePartEmployeur =
      categoryPro3239 === `'${CatPro3239.salarieParticulierEmployeur}'`;
  }
  if (isAssMat)
    return "L'absence de l'enfant gardé, les congés payés, le congé de maternité, de paternité ou d'adoption, le congé de présence parentale, l'arrêt de travail lié à un accident du travail, ou une maladie professionnelle ou un accident de trajet, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé de solidarité internationale, et le congé de solidarité familiale sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :";
  else if (isSalariePartEmployeur)
    return "L'absence du particulier employeur, les congés payés, le congé de maternité, de paternité ou d'adoption, le congé de présence parentale, l'arrêt de travail lié à un accident du travail, ou une maladie professionnelle ou un accident de trajet, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé de solidarité internationale, et le congé de solidarité familiale sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :";
  return "Les congés payés, le congé de maternité ou d'adoption, le congé de présence parentale, l'arrêt de travail lié à un accident du travail ou une maladie professionnelle, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé de solidarité internationale, le congé de solidarité familiale et le stage de fin d'étude de plus de 2 mois sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :";
};
