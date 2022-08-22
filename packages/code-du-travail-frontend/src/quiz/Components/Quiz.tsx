import styled from "styled-components";
import { icons } from "@socialgouv/cdtn-ui";
import { QuizSummary } from "./QuizSummary";
import { QuizQuestionnary } from "./QuizQuestionnary";
import { createQuizStore, QuizProvider } from "../store";

const { Gear: GearIcon } = icons;

export const Quiz = ({ QuizName }) => {
  return (
    <QuizWrapper>
      <QuizHeader>
        <StyledIcon>
          <GearIcon />
        </StyledIcon>
        <QuizHeaderTitle>Quelle est votre situation ?</QuizHeaderTitle>
      </QuizHeader>
      <QuizBody>
        <QuizProvider createStore={() => createQuizStore(QuizName)}>
          <QuizSummary></QuizSummary>
          <QuizQuestionnary></QuizQuestionnary>
        </QuizProvider>
      </QuizBody>
    </QuizWrapper>
  );
};

const QuizWrapper = styled.div`
  border: 1px solid #7598d6;
  border-radius: 6px;
  max-width: 862px;
  margin: auto;
  padding: 32px;
`;

const QuizHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 32px;
`;

const QuizHeaderTitle = styled.h2`
  margin: 3px 0;
`;

const StyledIcon = styled.div`
  margin-right: 24px;
`;

const QuizBody = styled.div`
  display: flex;
  flex-direction: column;
`;
