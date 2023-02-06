import { Formula } from "@socialgouv/modeles-social";
import { MathFormula } from "../../../../common/MathFormula";
import { SectionTitle } from "../../../../common/stepStyles";
import { Paragraph } from "@socialgouv/cdtn-ui";

type Props = {
  formula: Formula;
};

export default function FormulaInterpreter(props: Props) {
  return (
    <>
      {props.formula.explanations.length > 0 && (
        <div data-testid="formula">
          <SectionTitle>Formule</SectionTitle>
          <MathFormula formula={props.formula.formula} />
          {props.formula.explanations.map((explanation, index) => (
            <Paragraph key={"explanation-" + index}>{explanation}</Paragraph>
          ))}
          {props.formula.annotations?.map((annotation, index) => (
            <Paragraph key={"annotations-" + index}>{annotation}</Paragraph>
          ))}
        </div>
      )}
    </>
  );
}
