import { sum } from "../common/math";

function getIndemnitePrecarite({ salaire, salaires, typeRemuneration }) {
  switch (typeRemuneration) {
    case "mensuel": {
      const sommeSalaires = sum(salaires.map(s => s.salaire));
      return {
        indemnite: (1 / 10) * sommeSalaires,
        formule: `1/10 * somme(salaires)`,
        inputs: { "somme des salaires": sommeSalaires }
      };
    }
    case "total": {
      return {
        indemnite: (1 / 10) * salaire,
        formule: `1/10 * somme(salaires)`,
        inputs: { "somme des salaires": salaire }
      };
    }
    default:
      return { indemnite: 0, formule: "", inputs: {} };
  }
}

export { getIndemnitePrecarite };
