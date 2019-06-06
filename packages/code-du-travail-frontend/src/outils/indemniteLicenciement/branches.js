/**
 * branches list all the convention collective
 * we support for custom indemnite
 */

export const branches = [
  {
    value: "0044",
    hasIndemniteLicenciement: true,
    label:
      "Convention collective nationale des industries chimiques et connexes"
  },
  {
    value: "1518",
    hasIndemniteLicenciement: false,
    label: "Convention collective nationale de l'Animation"
  },
  {
    value: "0843",
    hasIndemniteLicenciement: false,
    label:
      "Convention collective nationale de la Boulangerie-pâtisserie artisanale"
  },
  {
    value: "1351",
    hasIndemniteLicenciement: false,
    label: "Convention collective nationale de la Prévention et sécurité"
  },
  {
    value: "1534",
    hasIndemniteLicenciement: false,
    label:
      "Convention collective nationale Viandes industries commerces en gros"
  },
  {
    value: "0992",
    hasIndemniteLicenciement: false,
    label:
      "Convention collective nationale Boucherie boucherie-charcuterie triperie"
  },
  {
    value: "2344",
    hasIndemniteLicenciement: false,
    label: "Convention collective nationale de la Sidérurgie"
  },
  {
    value: "0029",
    hasIndemniteLicenciement: false,
    label: "Etablissements privés d'hospitalisation (FEHAP)"
  },
  {
    value: "1596",
    hasIndemniteLicenciement: false,
    label: "Ouvriers du bâtiment (entreprises jusqu'à 10 salariés)"
  },
  {
    value: "1597",
    hasIndemniteLicenciement: false,
    label: "Ouvriers du bâtiment (entreprises de plus 10 salariés)"
  }
];

export function hasIndemniteLicenciement(idcc) {
  const branche = branches.find(branche => branche.value === idcc);
  return branche && branche.hasIndemniteLicenciement;
}
