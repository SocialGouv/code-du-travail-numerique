import { round, yearPlural } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import type { Formula, FormulaProps, IFormula } from "./types";

export enum CatPro1501 {
  nonCadres = "Non-cadres",
  cadres = "Cadres",
}

export type Formula1501Props = {
  category: CatPro1501;
  isEconomicFiring: boolean;
  age: number;
  seniority: number;
  refSalary: number;
};

export class Formula1501
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC1501>
{
  computeFormula(
    props: FormulaProps<SupportedCcIndemniteLicenciement.IDCC1501>
  ): Formula {
    switch (true) {
      case props.category === CatPro1501.nonCadres:
        return this.computeFormulaNonCadres(props);
      case props.category === CatPro1501.cadres:
        return this.computeFormulaCadres(props);
    }
    return { explanations: [], formula: "" };
  }

  private computeFormulaNonCadres(
    props: FormulaProps<SupportedCcIndemniteLicenciement.IDCC1501>
  ): Formula {
    let formula = "";
    const explanations = [];

    if (props.seniority > 2) {
      formula = "(1/10 * Sref * A1)";
      explanations.push(
        `A1 : Ancienneté totale (${round(props.seniority)} ${yearPlural(
          props.seniority
        )})`
      );

      if (props.seniority > 10 && props.seniority <= 15) {
        const above = props.seniority - 10;
        formula += " + (1/15 * Sref * A2)";
        explanations.push(
          `A2: Années d'ancienneté au-delà de 10 ans (${round(
            above
          )} ${yearPlural(above)})`
        );
      }
      if (props.seniority > 15) {
        const above = props.seniority - 10;
        formula += " + (2/15 * Sref * A2)";
        explanations.push(
          `A2: Années d'ancienneté au-delà de 10 ans (${round(
            above
          )} ${yearPlural(above)})`
        );
      }
      if (props.isEconomicFiring && props.age > 50 && props.seniority >= 10) {
        formula += ` + (15% * (${formula}))`;
      }

      explanations.push(
        `Sref : Salaire de référence (${round(props.refSalary)} €)`
      );
    }
    return { explanations, formula };
  }

  private computeFormulaCadres(
    props: FormulaProps<SupportedCcIndemniteLicenciement.IDCC1501>
  ): Formula {
    let formula = "";
    const explanations = [];

    if (props.seniority >= 1) {
      if (props.seniority <= 5) {
        formula = "(1/10 * Sref * A)";
        explanations.push(
          `A : Ancienneté totale (${round(props.seniority)} ${yearPlural(
            props.seniority
          )})`
        );
      } else {
        formula = "(2/10 * Sref * A1)";
        explanations.push(
          `A1 : Années de présence au total (${round(
            props.seniority
          )} ${yearPlural(props.seniority)})`
        );
        const between5and10 = Math.min(props.seniority, 10) - 5;
        if (between5and10 > 0) {
          formula += " + (1/15 * Sref * A2)";
          explanations.push(
            `A2 : Années au dessus de 5 ans jusqu'à 10 ans (${round(
              between5and10
            )} ${yearPlural(between5and10)})`
          );
        }
        const between10and15 = Math.min(props.seniority, 15) - 10;
        if (between10and15 > 0) {
          formula += " + (2/15 * Sref * A3)";
          explanations.push(
            `A3 : Années au dessus de 10 ans jusqu'à 15 ans (${round(
              between10and15
            )} ${yearPlural(between10and15)})`
          );
        }
        const above15 = props.seniority - 15;
        if (above15 > 0) {
          formula += " + (3/15 * Sref * A4)";
          explanations.push(
            `A4 : Années au dessus de 15 ans (${round(above15)} ${yearPlural(
              above15
            )})`
          );
        }
      }

      if (props.isEconomicFiring && props.age > 50 && props.seniority >= 10) {
        formula += ` + (15% * (${formula}))`;
      }

      explanations.push(
        `Sref : Salaire de référence (${round(props.refSalary)} €)`
      );
    }
    return { explanations, formula };
  }
}
