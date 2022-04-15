import React from "react";
import { Rule } from "../../../publicodes";
import PubliQuestion from "../../../common/PubliQuestion";

export type InformationStepProps = {
  questions: Question[];
};

type Question = {
  name: string;
  rule: Rule;
  answered: boolean;
};

const InformationStep = ({ questions }: InformationStepProps): JSX.Element => (
  <>
    {questions.map((question) => {
      return (
        <PubliQuestion
          key={question.name}
          name={"infos." + question.name}
          rule={question.rule}
        />
      );
    })}
  </>
);

export default InformationStep;
