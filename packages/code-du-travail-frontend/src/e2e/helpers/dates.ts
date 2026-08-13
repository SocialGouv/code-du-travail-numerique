import { format, startOfMonth, subMonths, subYears } from "date-fns";

const ISO_DATE = "yyyy-MM-dd";

type Seniority = {
  years: number;
  months?: number;
};

/**
 * Dates de contrat pour les parcours des simulateurs d'indemnité.
 *
 * Les simulateurs refusent une date de fin de contrat (ou de notification)
 * antérieure de plus de 18 mois à aujourd'hui : le bouton « Suivant » reste
 * alors désactivé. Des dates écrites en dur dans un test finissent donc
 * fatalement par le casser — on les recalcule à chaque exécution.
 *
 * L'ancrage sur le 1er du mois courant garantit un écart d'un nombre entier de
 * mois entre les deux dates, quelle que soit la longueur des mois traversés :
 * l'ancienneté — et donc le montant attendu — reste stable.
 */
export const contractDates = ({ years, months = 0 }: Seniority) => {
  const endDate = startOfMonth(new Date());
  return {
    startDate: format(subMonths(subYears(endDate, years), months), ISO_DATE),
    endDate: format(endDate, ISO_DATE),
  };
};
