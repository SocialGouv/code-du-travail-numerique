import styled from "styled-components";
import { icons } from "@socialgouv/cdtn-ui";
const { Gear: GearIcon } = icons;

export const Quiz = () => {
  return (
    <QuizWrapper>
      <QuizHeader>
        <StyledIcon>
          <GearIcon />
        </StyledIcon>
        <QuizHeaderTitle>Quelle est votre situation ?</QuizHeaderTitle>
      </QuizHeader>
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
`;

const QuizHeaderTitle = styled.div`
  font-family: "Merriweather";
  font-weight: 400;
  font-size: 26px;
`;

const StyledIcon = styled.div`
  margin-right: 24px;
`;
