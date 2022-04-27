import React from "react";
import { Rule } from "../../../publicodes";
import PubliQuestion from "../../../common/PubliQuestion";

export type InformationStepProps = {
  questions: Question[];
  onChange: (name: string, value: string) => void;
};

type Question = {
  name: string;
  rule: Rule;
};

const InformationStep = ({
  questions,
  onChange,
}: InformationStepProps): JSX.Element => (
  <>
    {questions.map((question) => {
      return (
        <PubliQuestion
          key={question.name}
          name={"infos." + question.name}
          rule={question.rule}
          onChange={(values) => onChange(question.name, values as string)}
        />
      );
    })}
  </>
);

export default InformationStep;
