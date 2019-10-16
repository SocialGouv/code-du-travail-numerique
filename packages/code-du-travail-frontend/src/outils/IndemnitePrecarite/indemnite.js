import { sum, round } from "../common/math";

function getIndemnitePrecarite({
  salaire,
  salaires,
  typeRemuneration,
  rateValue = 1 / 10,
  rateLabel = "1/10"
}) {
  switch (typeRemuneration) {
    case "mensuel": {
      const sommeSalaires = sum(salaires.map(s => s.salaire));
      return {
        indemnite: round(rateValue * sommeSalaires),
        formule: `${rateLabel} * somme(salaires)`,
        inputs: { "somme des salaires": sommeSalaires }
      };
    }
    case "total": {
      return {
        indemnite: round(rateValue * salaire),
        formule: `${rateLabel} * "totalSalaires"`,
        inputs: { "total des salaires": salaire }
      };
    }
    default:
      return { indemnite: 0, formule: "", inputs: {} };
  }
}

export { getIndemnitePrecarite };
