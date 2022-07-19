import { Formula } from "@socialgouv/modeles-social";
import { MathFormula } from "../../../../common/MathFormula";
import { SectionTitle } from "../../../../common/stepStyles";

type Props = {
  formula: Formula;
};

export default function FormulaInterpreter(props: Props) {
  return (
    <>
      <SectionTitle>Formule</SectionTitle>
      <MathFormula formula={props.formula.formula} />
    </>
  );
}
