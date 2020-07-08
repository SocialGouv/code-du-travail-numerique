import { round, sum } from "../common/math";

function getIndemnitePrecarite({
  salaire,
  salaires,
  typeRemuneration,
  rateValue = 1 / 10,
  rateLabel = "1/10",
}) {
  switch (typeRemuneration) {
    case "mensuel": {
      const sommeSalaires = sum(salaires.map((s) => s.salaire));
      return {
        formula: `${rateLabel} * somme(salaires)`,
        indemnite: round(rateValue * sommeSalaires),
        inputs: { "somme des salaires": sommeSalaires },
      };
    }
    case "total": {
      return {
        formula: `${rateLabel} * "totalSalaires"`,
        indemnite: round(rateValue * salaire),
        inputs: { "total des salaires": salaire },
      };
    }
    default:
      return { formula: "", indemnite: 0, inputs: {} };
  }
}

export { getIndemnitePrecarite };
