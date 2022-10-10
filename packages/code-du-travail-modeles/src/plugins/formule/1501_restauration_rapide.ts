import type { SupportedCcIndemniteLicenciement } from "..";
import type { Formula, FormulaProps, IFormula } from "./types";
import { min0, round, year } from "../../utils";

export enum CatPro1501 {
  nonCadres = "'Non-cadres'",
  cadres = "'Cadres'",
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
      case props.category === CatPro1501.cadres:
        return this.computeFormulaNonCadres(props);
      case props.category === CatPro1501.nonCadres:
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
      formula = "(1/10 x Sref x A1)";
      explanations.push(
        `A1 : Ancienneté totale (${round(props.seniority)} ${year(
          props.seniority
        )})`
      );

      if (props.seniority > 10 && props.seniority <= 15) {
        const above = props.seniority - 10;
        formula += " + (1/15 x Sref x A2)";
        explanations.push(
          `A2: Années d'ancienneté au-delà de 10 ans (${round(above)} ${year(
            above
          )})`
        );
      }
      if (props.seniority > 15) {
        const above = props.seniority - 10;
        formula += " + (2/15 x Sref x A2)";
        explanations.push(
          `A2: Années d'ancienneté au-delà de 10 ans (${round(above)} ${year(
            above
          )})`
        );
      }
      if (props.isEconomicFiring && props.age > 50 && props.seniority >= 10) {
        formula += ` + (15% x (${formula}))`;
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
        formula = "(1/10 x Sref x A)";
        explanations.push(
          `A : Ancienneté totale (${round(props.seniority)} ${year(
            props.seniority
          )})`
        );
      } else {
        formula =
          "(2/10 x Sref x A1) + (1/15 x Sref x A2) + (2/15 x Sref x A3) + (3/15 x Sref x A4)";
        explanations.push(
          `A1 : Années de présence au total (${round(props.seniority)} ${year(
            props.seniority
          )})`
        );
        const between5and10 = Math.min(props.seniority, 10) - 5;
        explanations.push(
          `A2 : Années au dessus de 5 ans jusqu'à 10 ans (${round(
            min0(between5and10),
            0
          )} ${year(min0(between5and10))})`
        );
        const between10and15 = Math.min(props.seniority, 15) - 10;
        explanations.push(
          `A3 : Années au dessus de 10 ans jusqu'à 15 ans (${round(
            min0(between10and15),
            0
          )} ${year(min0(between10and15))})`
        );
        const above15 = props.seniority - 15;
        explanations.push(
          `A4 : Années au dessus de 15 ans (${round(min0(above15), 0)} ${year(
            min0(above15)
          )})`
        );
      }

      if (props.isEconomicFiring && props.age > 50 && props.seniority >= 10) {
        formula += ` + (15% x (${formula}))`;
      }

      explanations.push(
        `Sref : Salaire de référence (${round(props.refSalary)} €)`
      );
    }
    return { explanations, formula };
  }
}
