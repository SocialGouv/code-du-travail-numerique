import React from "react";
import PubliQuestion from "../../../common/PubliQuestion";
import { Rule } from "@socialgouv/modeles-social";

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
          onHasSameSalaryChange={(values) =>
            onChange(question.name, values as string)
          }
        />
      );
    })}
  </>
);

export default InformationStep;
