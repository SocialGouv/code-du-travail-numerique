import {CatPro3239} from "@socialgouv/modeles-social";

export const getForMoreInfoMessage = (
  isAgreementBetter: boolean,
  agreementNumber?: number
): string | undefined => {
  if (isAgreementBetter && agreementNumber === 44) {
    return "Le montant donné n’est qu’une estimation, il est donné à titre indicatif. Pour simplifier l’utilisation de ce simulateur, certains paramètres complexes n’ont pas été pris en compte dans le calcul de l’indemnité et peuvent donner lieu à un montant différent. Par exemple, les absences de moins d’un mois ou les contrats antérieurs au CDI ne sont pas pris en compte dans le calcul de l’ancienneté du salarié. Des règles particulières peuvent également s’appliquer en cas de licenciement pour raisons économiques. L'outil n'a pas intégré ces règles car elles ne s’appliquent pas de façon uniforme à toutes les entreprises.";
  }
  return "Le montant donné n’est qu’une estimation, il est donné à titre indicatif. Pour simplifier l’utilisation de ce simulateur, certains paramètres complexes n’ont pas été pris en compte dans le calcul de l’indemnité et peuvent donner lieu à un montant différent. Par exemple, les absences de moins d’un mois ou les contrats antérieurs au CDI ne sont pas pris en compte dans le calcul de l’ancienneté du salarié.";
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
    isAssMat = categoryPro3239 === CatPro3239.assistantMaternel;
  }
  if (isAssMat)
    return "À partir des éléments que vous avez saisis, l’indemnité de licenciement (appelée « indemnité de rupture » pour les assistants maternels) est estimée à :";
  return "À partir des éléments que vous avez saisis, l’indemnité de licenciement est estimée à :";
};
