import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuizStore } from "../store";
import { QuizQuestionnaryItem } from "./QuizQuestionnaryItem";
import { Tooltip } from "../../common/Tooltip";

export const QuizQuestionnary = () => {
  const currentQuestion = useQuizStore((state) => state.currentQuestion);
  const [openedTooltip, setOpenedTooltip] = useState(false);
  useEffect(() => {
    setOpenedTooltip(false);
  }, [currentQuestion]);
  return (
    <QuizQuestionWrapper>
      <QuizQuestionHeaderWrapper>
        <QuizQuestionHeader>{currentQuestion.text}</QuizQuestionHeader>
        {currentQuestion.info && (
          <Tooltip onChange={setOpenedTooltip}></Tooltip>
        )}
      </QuizQuestionHeaderWrapper>
      {openedTooltip && (
        <QuizInformationWrapper>{currentQuestion.info}</QuizInformationWrapper>
      )}
      <QuizRadioWrapper>
        {currentQuestion.responses.map((response, index: number) => (
          <QuizQuestionnaryItem
            key={`${response.text}${index}`}
            response={response}
            index={index}
          ></QuizQuestionnaryItem>
        ))}
      </QuizRadioWrapper>
      <QuizDescription>{currentQuestion.description}</QuizDescription>
    </QuizQuestionWrapper>
  );
};

const QuizQuestionWrapper = styled.div`
  border: 0.5px solid #7598d6;
  margin-left: 36px;
  padding: 14px 18px;
`;

const QuizQuestionHeader = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  color: #3e486e;
  margin-right: 8px;
`;

const QuizQuestionHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0 11px;
`;

const QuizDescription = styled.i`
  display: block;
  margin-top: 7px;
`;

const QuizRadioWrapper = styled.div`
  > div {
    margin: 4px 0;
  }
`;

const QuizInformationWrapper = styled.div`
  background: #f2f5fa;
  border-radius: 6px;
  padding: 13px 20px;
  font-size: 14px;
  margin: 11px 5px;
`;
