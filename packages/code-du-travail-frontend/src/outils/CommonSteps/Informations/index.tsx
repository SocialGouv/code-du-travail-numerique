import React from "react";

import { Alert, Paragraph, Text, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { PubliQuestion } from "./components";
import { MatomoActionEvent } from "../../../lib";
import { PublicodesInformation } from "./store";
import Html from "../../../common/Html";

export type InformationStepProps = {
  blockingNotification?: string;
  onChange: (key: string, value: unknown) => void;
  informations: PublicodesInformation[];
  errors: Record<string, string>;
};

const CommonInformationStep = ({
  blockingNotification,
  onChange,
  informations,
  errors,
}: InformationStepProps): JSX.Element => (
  <>
    {informations.map((info) => {
      return (
        <PubliQuestion
          key={info.id}
          name={"infos." + info.question.name}
          rule={info.question.rule}
          trackQuestionEvent={MatomoActionEvent.INDEMNITE_LICENCIEMENT}
          value={info.info}
          onChange={(v) => onChange(info.question.rule.nom, v)}
          error={errors[info.question.rule.nom] ?? undefined}
        />
      );
    })}
    {blockingNotification && (
      <StyledAlert variant="primary">
        <Paragraph noMargin>
          <Text variant="primary" fontSize="hsmall" fontWeight="700">
            À noter
          </Text>
          <br />
          <Html>{blockingNotification}</Html>
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
