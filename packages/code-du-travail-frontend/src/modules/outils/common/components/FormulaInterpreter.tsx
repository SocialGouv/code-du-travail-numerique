import { Formula } from "@socialgouv/modeles-social";
import { MathFormula } from "./MathFormula";
import React from "react";
import Link from "../../../common/Link";

type Props = {
  formula?: Formula;
};

export default function FormulaInterpreter(props: Props) {
  if (!props.formula) return <></>;
  return (
    <>
      {props.formula.explanations.length > 0 && (
        <div data-testid="formula">
          <h4>Formule</h4>
          <MathFormula formula={props.formula.formula} />
          {props.formula.explanations.map((explanation, index) => (
            <p key={"explanation-" + index}>{explanation}</p>
          ))}
          {props.formula.annotations?.map((annotation, index) => (
            <p key={"annotations-" + index}>{annotation}</p>
          ))}

          <p>
            <Link
              href="https://code.travail.gouv.fr/contribution/comment-determiner-lanciennete-du-salarie"
              target="_blank"
            >
              Comment determiner l&apos;ancienneté d&apos;un salarié&nbsp;?
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
