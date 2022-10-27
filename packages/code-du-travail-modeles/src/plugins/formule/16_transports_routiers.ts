import { round, yearPlural } from "../../utils";
import type { CategoryPro16, SupportedCcIndemniteLicenciement } from "..";
import type { Formula, FormulaProps, IFormula } from "./types";

export type Formula16Props = {
  category: CategoryPro16;
  seniority: number;
  seniorityTAM?: number;
  refSalary: number;
  age: number;
  driveInability?: "definitive" | "temporary";
  haveRightToRetirement?: boolean;
};

export class Formula16
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC0016>
{
  computeFormula(
    props: FormulaProps<SupportedCcIndemniteLicenciement.IDCC0016>
  ): Formula {
    switch (true) {
      case props.category === "'Ouvriers'":
        return this.computeFormulaOuvriers(props);
      case props.category === "'Employés'":
        return this.computeFormulaEmployees(props);
      case props.category === "'TAM'":
        return this.computeFormulaTAM(props);
      case props.category === "'Ingénieurs et cadres'":
        return this.computeFormulaEngineer(props);
    }
    return { explanations: [], formula: "" };
  }

  private computeFormulaOuvriers(
    props: FormulaProps<SupportedCcIndemniteLicenciement.IDCC0016>
  ): Formula {
    switch (props.driveInability) {
      case undefined:
        return this.computeFormulaOuvriersOthers(props);
      default:
        return this.computeFormulaOuvriersDriveInability(props);
    }
  }

  private computeFormulaOuvriersOthers(
    props: FormulaProps<SupportedCcIndemniteLicenciement.IDCC0016>
  ): Formula {
    let ratio = undefined;
    let hasCut = false;
    const { seniority, age, haveRightToRetirement } = props;
    switch (true) {
      case seniority >= 3:
        ratio = "2 / 10";
        hasCut = age >= 60 && age <= 65 && haveRightToRetirement === true;
        break;
      case seniority >= 2:
        ratio = "1 / 10";
        hasCut = false;
        break;
    }
    return this.buildFormula(ratio, hasCut, props);
  }

  private computeFormulaOuvriersDriveInability({
    seniority,
    refSalary,
    driveInability,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC0016>): Formula {
    let formula = "";
    const explanations = [];
    let coeff = 0;
    if (driveInability === "definitive") {
      switch (true) {
        case seniority >= 20:
          coeff = 6;
          break;
        case seniority >= 15:
          coeff = 5;
          break;
        case seniority >= 10:
          coeff = 4;
          break;
        case seniority >= 5:
          coeff = 3;
          break;
        case seniority >= 3:
          coeff = 2;
          break;
      }
    } else if (seniority > 3) {
      coeff = 1;
    }

    if (coeff > 0) {
      formula = `(${coeff} * Sref)`;
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    }
    return { explanations, formula };
  }

  private computeFormulaEmployees(
    props: FormulaProps<SupportedCcIndemniteLicenciement.IDCC0016>
  ): Formula {
    let ratio = undefined;
    let hasCut = false;
    const { seniority, age, haveRightToRetirement } = props;
    switch (true) {
      case seniority >= 3:
        ratio = "2 / 10";
        hasCut = age >= 60 && age <= 65 && haveRightToRetirement === true;
        break;
      case seniority >= 2:
        ratio = "1 / 10";
        hasCut = age >= 60 && age <= 65 && haveRightToRetirement === true;
        break;
    }
    return this.buildFormula(ratio, hasCut, props);
  }

  private computeFormulaTAM(
    props: FormulaProps<SupportedCcIndemniteLicenciement.IDCC0016>
  ): Formula {
    let ratio = undefined;
    let hasCut = false;
    const { seniority, age, haveRightToRetirement } = props;
    switch (true) {
      case age <= 65 && seniority >= 3:
        ratio = "3 / 10";
        hasCut = age >= 60 && age <= 65 && haveRightToRetirement === true;
        break;
      case age <= 65 && seniority >= 2:
        ratio = "1 / 10";
        hasCut = age >= 60 && age <= 65 && haveRightToRetirement === true;
        break;
    }
    return this.buildFormula(ratio, hasCut, props);
  }

  private yearBetween60And65(age: number, seniority: number): number {
    if (age < 60) return 0;
    if (age > 65) return 0;
    const diff = age - 60;
    if (seniority > diff) {
      return diff;
    }
    return seniority;
  }

  private buildFormula(
    ratio: string | undefined,
    hasCut: boolean,
    {
      seniority,
      refSalary,
      age,
    }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC0016>
  ): Formula {
    let formula = "";
    const explanations = [];
    const yearLabel = yearPlural(seniority);
    if (ratio) {
      formula = `(${ratio} * Sref * ${hasCut ? "A1" : "A"})`;
      explanations.push(
        `${hasCut ? "A1" : "A"} : Ancienneté totale (${round(
          seniority
        )} ${yearLabel})`
      );
      if (hasCut) {
        formula += ` - (20% * A2 * (${ratio} * Sref * A1))`;
        explanations.push(
          `A2 : Années entre 60 et 65 ans (${round(
            this.yearBetween60And65(age, seniority)
          )} ${yearLabel})`
        );
      }
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    }
    return { explanations, formula };
  }

  private computeFormulaEngineer(
    props: FormulaProps<SupportedCcIndemniteLicenciement.IDCC0016>
  ): Formula {
    const seniorityTotal = props.seniority + (props.seniorityTAM ?? 0);
    if (seniorityTotal < 3) {
      return { explanations: [], formula: "" };
    }
    const { age, seniority, haveRightToRetirement } = props;
    switch (true) {
      case seniorityTotal > 30 && age >= 61:
        return this.buildFormulaEngineer(
          4,
          haveRightToRetirement === true,
          props
        );
      case seniorityTotal > 20 && age >= 61:
        return this.buildFormulaEngineer(
          3,
          haveRightToRetirement === true,
          props
        );
      case seniorityTotal > 10 && seniority >= 5 && age >= 61:
        return this.buildFormulaEngineer(
          2,
          haveRightToRetirement === true,
          props
        );
      default:
        return this.buildFormulaEngineer(
          0,
          age >= 61 && haveRightToRetirement === true,
          props
        );
    }
  }

  private buildFormulaEngineer(
    coeff: number,
    hasCut: boolean,
    {
      age,
      seniority,
      refSalary,
      seniorityTAM,
    }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC0016>
  ): Formula {
    let formula = "";
    const explanations: string[] = [];
    if (age > 65) {
      return { explanations, formula };
    }
    const yearLabel = yearPlural(seniority);
    const yearTAM = round(seniorityTAM ?? 0) < 2 ? "an" : "ans";
    let base = "";
    let needParenthesis = false;
    if (seniorityTAM) {
      base = "(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)";
      explanations.push(
        `A1 : Ancienneté dans la catégorie Ingénieurs et cadres (${round(
          seniority
        )} ${yearLabel})`
      );
      explanations.push(
        `A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (${round(
          seniorityTAM
        )} ${yearTAM})`
      );
    } else {
      base = "4 / 10 * Sref * A";
      needParenthesis = true;
      explanations.push(
        `A : Ancienneté totale (${round(seniority)} ${yearLabel})`
      );
    }
    formula = needParenthesis ? `(${base})` : base;
    explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    if (hasCut) {
      formula += ` - (20% * (${base}))`;
    }
    if (coeff > 0) {
      formula += ` + (${coeff} * Sref)`;
    }
    return { explanations, formula };
  }
}
