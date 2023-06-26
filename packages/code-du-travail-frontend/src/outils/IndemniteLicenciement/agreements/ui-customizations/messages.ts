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
  return "Les congés payés, le congé de maternité, paternité ou d'adoption, le congé de présence parentale, le congé parental d'éducation à temps partiel, l'arrêt de travail lié à un accident du travail ou une maladie professionnelle, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé de solidarité internationale, le congé de solidarité familiale et le stage de fin d'étude de plus de 2 mois sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :";
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
  switch (agreementNumber) {
    case 3239:
      return undefined;
    case 1702:
      return "Indiquez le montant des salaires (en incluant l’indemnité de congés payés, les primes, dont la prime de vacances, et les avantages en nature) dans le premier champ et le montant des primes dans le second champ (uniquement pour les 3 derniers mois)";
    default:
      return "Indiquez le montant des salaires (en incluant les primes et avantages en nature) dans le premier champ et le montant des primes dans le second champ (uniquement pour les 3 derniers mois)";
  }
};

export const isParentalNoticeHiddenForAgreement = (
  agreementNumber: number
): boolean => {
  return agreementNumber === 3239 || agreementNumber === 1404;
};

export const getForMoreInfoMessage = (
  isAgreementBetter: boolean,
  agreementNumber?: number
): string | undefined => {
  if (isAgreementBetter && agreementNumber === 44) {
    return "Le montant donné n’est qu’une estimation, il est donné à titre indicatif. Pour simplifier l’utilisation de ce simulateur, certains paramètres complexes n’ont pas été pris en compte dans le calcul de l’indemnité et peuvent donner lieu à un montant différent. Par exemple, les absences de moins d’un mois ou les contrats antérieurs au CDI ne sont pas pris en compte dans le calcul de l’ancienneté du salarié. Des règles particulières peuvent également s’appliquer en cas de licenciement pour raisons économiques. L'outil n'a pas intégré ces règles car elles ne s’appliquent pas de façon uniforme à toutes les entreprises.";
  }
  return undefined;
};
