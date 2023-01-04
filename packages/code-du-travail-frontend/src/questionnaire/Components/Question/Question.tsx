import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store";
import { Response } from "./Response";
import { Tooltip } from "../../../common/Tooltip";
import { ShowInfo } from "./ShowInfo";
import { trackClickHelp } from "../../tracking";
import { Text } from "@socialgouv/cdtn-ui";

export const Question = () => {
  const currentQuestion = useStore((state) => state.currentQuestion);
  const lastResponse = useStore((state) => state.lastResponse);
  const [openedTooltip, setOpenedTooltip] = useState(false);
  useEffect(() => {
    setOpenedTooltip(false);
  }, [currentQuestion]);
  return lastResponse?.slug ? (
    <ShowInfo slug={lastResponse.slug}></ShowInfo>
  ) : (
    <div>
      <QuestionHeaderWrapper>
        <Text fontWeight="600" fontSize="default">
          {currentQuestion?.text}
        </Text>
        {currentQuestion?.info && (
          <Tooltip
            onChange={(opened) => {
              setOpenedTooltip(opened);
              if (opened) {
                trackClickHelp(currentQuestion.trackingName);
              }
            }}
            data-testid={`Tooltip-${currentQuestion?.text}`}
          />
        )}
      </QuestionHeaderWrapper>
      {openedTooltip && (
        <InformationWrapper>{currentQuestion?.info}</InformationWrapper>
      )}

      {currentQuestion?.responses.map((response, index: number) => (
        <Response
          key={`${response.text}${index}`}
          response={response}
          index={index}
        ></Response>
      ))}
      <Description>{currentQuestion?.description}</Description>
    </div>
  );
};

const QuestionHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0 11px;
`;

const Description = styled.i`
  display: block;
  margin-top: 7px;
`;

const InformationWrapper = styled.div`
  background: #f2f5fa;
  border-radius: 6px;
  padding: 13px 20px;
  font-size: 14px;
  margin: 11px 5px;
`;
