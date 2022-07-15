import { MathFormula } from "../../../../common/MathFormula";
import { SectionTitle } from "../../../../common/stepStyles";

type Props = {
  formula: string;
};

export default function Formula(props: Props) {
  return (
    <>
      <SectionTitle>Formule</SectionTitle>
      <MathFormula formula={props.formula} />
    </>
  );
}
