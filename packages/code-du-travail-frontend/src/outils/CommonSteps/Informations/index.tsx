import React from "react";

import { Alert, Paragraph, Text, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { Question } from "../../DureePreavisRetraite/state";
import { PubliQuestion } from "./components";
import { MatomoActionEvent } from "../../../lib";

export type InformationStepProps = {
  questions: Question[];
  alertError?: string;
  onChange: (key: string, value: unknown) => void;
  values: Record<string, string>;
  errors: Record<string, string>;
};

const CommonInformationStep = ({
  questions,
  alertError,
  onChange,
  values,
  errors,
}: InformationStepProps): JSX.Element => (
  <>
    {questions.map((question) => {
      return (
        <PubliQuestion
          key={question.name}
          name={"infos." + question.name}
          rule={question.rule}
          trackQuestionEvent={MatomoActionEvent.INDEMNITE_LICENCIEMENT}
          value={values[question.rule.nom]}
          onChange={(v) => onChange(question.rule.nom, v)}
          error={errors[question.rule.nom] ?? undefined}
        />
      );
    })}
    {alertError && (
      <StyledAlert variant="primary">
        <Paragraph noMargin>
          <Text variant="primary" fontSize="hsmall" fontWeight="700">
            À noter
          </Text>
          <br />
          {alertError}
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

export default CommonInformationStep;
