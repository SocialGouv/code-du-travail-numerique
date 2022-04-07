/**
 * - soit S1/12 ou S2/mois dans l'entreprise
 * S1 : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
 * S2 : total des salaires perçus précédemment à l'envoi de la lettre de licenciement si l'ancienneté est inférieure à 12 mois (brut)
 *
 * - soit 1/3*(S + ((P/12)*3))
 * S : total des salaires perçus lors des 3 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
 * P : prime(s) ou gratification(s) de caractère annuel ou exceptionnel versée(s) pendant cette période (prise en compte prorata temporis)
 */
export const computeSalaireRefLegal = (salaries: number[]): number => {
  console.log("List", salaries);
  const sumSalaries = salaries.reduce(
    (previous, current) => previous + current,
    0
  );
  console.log("Sum", sumSalaries);
  const avgSalaries = sumSalaries / salaries.length;
  console.log("avg", avgSalaries);
  return avgSalaries;
};
