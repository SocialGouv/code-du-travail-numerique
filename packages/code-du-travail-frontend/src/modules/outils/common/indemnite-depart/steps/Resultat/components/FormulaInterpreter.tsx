import { Formula } from "@socialgouv/modeles-social";
import { MathFormula } from "src/outils/common/MathFormula";

type Props = {
  formula?: Formula;
};

export default function FormulaInterpreter(props: Props) {
  if (!props.formula) return <></>;
  return (
    <>
      {props.formula.explanations.length > 0 && (
        <div data-testid="formula">
          <h2>Formule</h2>
          <MathFormula formula={props.formula.formula} />
          {props.formula.explanations.map((explanation, index) => (
            <p key={"explanation-" + index}>{explanation}</p>
          ))}
          {props.formula.annotations?.map((annotation, index) => (
            <p key={"annotations-" + index}>{annotation}</p>
          ))}
        </div>
      )}
    </>
  );
}
