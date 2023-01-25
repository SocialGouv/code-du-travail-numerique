import { CatPro3239 } from "@socialgouv/modeles-social/lib/modeles/conventions";
import { PublicodesInformation } from "../../CommonSteps/Informations/store";

export const getMessageMotifExample = (
  informations?: Array<PublicodesInformation>
): string => {
  const categoryPro3239 = informations?.find(
    (item) =>
      item.question.rule.nom ===
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle"
  )?.info;
  const isAssMat = categoryPro3239 === `'${CatPro3239.assistantMaternel}'`;
  const isSalariePartEmployeur =
    categoryPro3239 === `'${CatPro3239.salarieParticulierEmployeur}'`;
  switch (true) {
    case isAssMat:
      return "L'absence de l'enfant gardé, les congés payés, le congé de maternité, de paternité ou d'adoption, le congé de présence parentale, l'arrêt de travail lié à un accident du travail, ou une maladie professionnelle ou un accident de trajet, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé de solidarité internationale, et le congé de solidarité familiale sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :";
    case isSalariePartEmployeur:
      return "L'absence du particulier employeur, les congés payés, le congé de maternité, de paternité ou d'adoption, le congé de présence parentale, l'arrêt de travail lié à un accident du travail, ou une maladie professionnelle ou un accident de trajet, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé de solidarité internationale, et le congé de solidarité familiale sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :";
    default:
      return "Les congés payés, le congé de maternité ou d'adoption, le congé de présence parental, l'arrêt de travail lié à un accident du travail ou une maladie professionnelle, le congé individuel de formation (CIF), le congé de solidarité internationale, le congé de solidarité familiale et le stage de fin d'étude de plus de 2 mois sont déjà prises en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :";
  }
};
