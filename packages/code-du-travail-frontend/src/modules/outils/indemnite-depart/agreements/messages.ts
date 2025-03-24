import { CatPro3239 } from "@socialgouv/modeles-social";

export const getMotifExampleMessage = (
  informations?: Record<string, any>,
  isRuptureConventionnelle = false
): string => {
  let isAssMat = false;
  let isSalariePartEmployeur = false;
  const wording = isRuptureConventionnelle
    ? "l'indemnité de rupture conventionnelle"
    : "l'indemnité de licenciement";
  if (informations) {
    const categoryPro3239 =
      informations[
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle"
      ];
    isAssMat = categoryPro3239 === CatPro3239.assistantMaternel;
    isSalariePartEmployeur =
      categoryPro3239 === CatPro3239.salarieParticulierEmployeur;
  }
  if (isAssMat || isSalariePartEmployeur)
    return `<b>Ne pas déclarer les absences suivantes :</b><br/><ul><li>Les jours fériés à l'exception des jours fériés tombant sur une semaine non travaillée prévue au contrat de travail</li><li>les congés payés</li><li>le congé maternité, paternité, d'accueil de l'enfant et d'adoption</li><li>les congés pour évènements familiaux</li><li>le congé de présence parentale</li><li>l'arrêt de travail lié à un accident du travail ou une maladie professionnelle ou un accident de trajet</li><li>le congé lié à la formation professionnelle (CIF, projet de transition professionnelle)</li><li>le congé pour la journée de la défense et de la citoyenneté</li><li>le congé pour assister à la cérémonie d'accueil dans la citoyenneté française</li><li>les absences pour la participation aux commissions paritaires de la branche</li><li>les absences pour la participation à la vie statutaire d'un syndicat ou à une formation syndicale sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :</li></ul><b>Pour le calcul de ${wording}, ces absences n'ont pas d'impact sur le calcul de l'ancienneté.</b>`;
  return `<b>Ne pas déclarer les absences suivantes :</b><br/><ul><li>Congés payés</li><li>Congé de maternité, de paternité ou d'adoption</li><li>Arrêt de travail lié à un accident du travail ou maladie professionnelle</li><li>Congé parental d'éducation à temps partiel</li><li>Congé de présence parentale</li><li>Congé lié à la formation professionnelle (CIF, projet de transition professionnelle)</li><li>Congé de solidarité familiale</li><li>Stage de fin d'étude de plus de 2 mois</li><li>Congé de solidarité internationale</li></ul><b>Pour le calcul de ${wording}, ces absences n'ont pas d'impact sur le calcul de l'ancienneté.</b>`;
};

export const isParentalNoticeHiddenForAgreement = (
  isAgreementBetter: boolean,
  agreementNumber: number
): boolean => {
  if (agreementNumber === 3239) return true;
  return (
    isAgreementBetter &&
    (agreementNumber === 1404 ||
      agreementNumber === 2120 ||
      agreementNumber === 292 ||
      agreementNumber === 176)
  );
};
