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
  if (isAssMat || isSalariePartEmployeur)
    return "Les jours fériés à l’exception des jours fériés tombant sur une semaine non travaillée prévue au contrat de travail, les congés payés, le congé maternité, paternité, d’accueil de l’enfant et d’adoption, les congés pour évènements familiaux, le congé de présence parentale, l'arrêt de travail lié à un accident du travail ou une maladie professionnelle ou un accident de trajet, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé pour la journée de la défense et de la citoyenneté, le congé pour assister à la cérémonie d’accueil dans la citoyenneté française, les absences pour la participation aux commissions paritaires de la branche, les absences pour la participation à la vie statutaire d’un syndicat ou à une formation syndicale sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :";
  return "Les congés payés, le congé de maternité ou d'adoption, le congé de présence parentale, le congé parental d'éducation à temps partiel, l'arrêt de travail lié à un accident du travail ou une maladie professionnelle, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé de solidarité internationale, le congé de solidarité familiale et le stage de fin d'étude de plus de 2 mois sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :";
};

export const getResultMessage = (
  informations?: Record<string, any>
): string => {
  let isAssMat = false;
  if (informations) {
    const categoryPro3239 =
      informations[
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle"
      ];
    isAssMat = categoryPro3239 === `'${CatPro3239.assistantMaternel}'`;
  }
  if (isAssMat)
    return "À partir des éléments que vous avez saisis, l’indemnité de licenciement (appelée « indemnité de rupture » pour les assistants maternels) est estimée à :";
  return "À partir des éléments que vous avez saisis, l’indemnité de licenciement est estimée à :";
};

export const getSalairesTempsPleinSubtitle = (
  agreementNumber?: number
): string | undefined => {
  if (agreementNumber && agreementNumber === 3239) return undefined;
  return "Indiquez le montant des salaires (en incluant les primes et avantages en nature) dans le premier champ et le montant des primes dans le second champ (uniquement pour les 3 derniers mois)";
};
