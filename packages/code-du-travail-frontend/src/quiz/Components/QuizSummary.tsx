import styled from "styled-components";
import { QuizSummaryItem } from "./QuizSummaryItem";
import { useQuizStore } from "../store";

export const QuizSummary = () => {
  const previousResponses = useQuizStore((state) => state.previousResponses);
  const goTo = useQuizStore((state) => state.goTo);
  return (
    <QuizSummaryWrapper>
      {previousResponses.map(({ text }, index) => {
        return (
          <QuizSummaryItem
            key={index}
            data={text}
            onClick={() => goTo(index)}
          ></QuizSummaryItem>
        );
      })}
    </QuizSummaryWrapper>
  );
};

const QuizSummaryWrapper = styled.ul`
  margin: 0;
`;
