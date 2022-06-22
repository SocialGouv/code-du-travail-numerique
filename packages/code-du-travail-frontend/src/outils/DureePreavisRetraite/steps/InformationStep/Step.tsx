import React from "react";
import { Alert, Paragraph, Text, theme } from "@socialgouv/cdtn-ui";
import { Rule } from "@socialgouv/modeles-social";
import styled from "styled-components";

import PubliQuestion from "../../../common/PubliQuestion";

export type InformationStepProps = {
  questions: Question[];
  error?: string;
  onChange: (name: string, value: string) => void;
};

type Question = {
  name: string;
  rule: Rule;
};

const InformationStep = ({
  questions,
  error,
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
    {error && (
      <StyledAlert variant="primary">
        <Paragraph noMargin>
          <Text variant="primary" fontSize="hsmall" fontWeight="700">
            À noter
          </Text>
          <br />
          {error}
        </Paragraph>
      </StyledAlert>
    )}
  </>
);

const { spacings } = theme;

const StyledAlert = styled(Alert)`
  margin-top: ${spacings.medium};
  width: 100%;
`;

export default InformationStep;
