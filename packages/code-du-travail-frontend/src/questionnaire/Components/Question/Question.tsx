import styled from "styled-components";
import { DossierLicenciementContext, useStore } from "../../store";
import { Response } from "./Response";
import { ShowInfo } from "./ShowInfo";
import { Fieldset, Legend, Text } from "@socialgouv/cdtn-ui";
import { InfoBulle } from "../../../outils/common/InfoBulle";
import { trackClickHelp } from "../../tracking";
import React, { useContext } from "react";

type QuestionProps = {
  widgetMode: boolean;
};

export const Question = ({ widgetMode }: QuestionProps) => {
  const store = useContext(DossierLicenciementContext);
  const currentQuestion = useStore(store, (state) => state.currentQuestion);
  const lastResponse = useStore(store, (state) => state.lastResponse);
  return lastResponse?.slug ? (
    <ShowInfo slug={lastResponse.slug} widgetMode={widgetMode}></ShowInfo>
  ) : (
    <Fieldset>
      <Legend>
        <Text fontWeight="600">{currentQuestion?.text}</Text>
        {currentQuestion?.info && (
          <StyledInfoBulle
            title={"Plus d'informations"}
            dataTestid={`Tooltip-${currentQuestion?.text}`}
            onVisibilityChange={() => {
              trackClickHelp(currentQuestion.trackingName);
            }}
          >
            {currentQuestion.info}
          </StyledInfoBulle>
        )}
      </Legend>

      {currentQuestion?.responses.map((response, index: number) => (
        <Response
          key={`${response.text}${index}`}
          response={response}
          index={index}
        ></Response>
      ))}
      <Description>{currentQuestion?.description}</Description>
    </Fieldset>
  );
};

const StyledInfoBulle = styled(InfoBulle)`
  padding: 0;
`;

const Description = styled.i`
  display: block;
  margin-top: 7px;
`;
