import styled from "styled-components";
import { useEffect, useState } from "react";
import { useStore } from "../../store";
import { Response } from "./Response";
import { Tooltip } from "../../../common/Tooltip";
import { ShowInfo } from "./ShowInfo";
import { trackClickHelp } from "../../tracking";
import { theme } from "@socialgouv/cdtn-ui";
const { breakpoints } = theme;

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
    <QuestionWrapper>
      <QuestionHeaderWrapper>
        <QuestionHeader>{currentQuestion?.text}</QuestionHeader>
        {currentQuestion?.info && (
          <Tooltip
            onChange={(opened) => {
              setOpenedTooltip(opened);
              if (opened) {
                trackClickHelp(currentQuestion.trackingName);
              }
            }}
          />
        )}
      </QuestionHeaderWrapper>
      {openedTooltip && (
        <InformationWrapper>{currentQuestion?.info}</InformationWrapper>
      )}
      <RadioWrapper>
        {currentQuestion?.responses.map((response, index: number) => (
          <Response
            key={`${response.text}${index}`}
            response={response}
            index={index}
          ></Response>
        ))}
      </RadioWrapper>
      <Description>{currentQuestion?.description}</Description>
    </QuestionWrapper>
  );
};

const QuestionWrapper = styled.div``;

const QuestionHeader = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  color: #3e486e;
  margin-right: 8px;
`;

const QuestionHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0 11px;
`;

const Description = styled.i`
  display: block;
  margin-top: 7px;
`;

const RadioWrapper = styled.div`
  > div {
    margin: 4px 0;
  }
`;

const InformationWrapper = styled.div`
  background: #f2f5fa;
  border-radius: 6px;
  padding: 13px 20px;
  font-size: 14px;
  margin: 11px 5px;
`;
