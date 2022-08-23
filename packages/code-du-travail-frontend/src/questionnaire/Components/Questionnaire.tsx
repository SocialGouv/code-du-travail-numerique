import styled from "styled-components";
import { icons, Section, Button } from "@socialgouv/cdtn-ui";
import { Summary } from "./Summary";
import { Question } from "./Question";
import { createStore, Provider } from "../store";

const { Gear: GearIcon } = icons;

export const Questionnaire = ({ name }) => {
  return (
    <Wrapper>
      <Header>
        <StyledIcon>
          <GearIcon />
        </StyledIcon>
        <HeaderTitle>Quelle est votre situation ?</HeaderTitle>
      </Header>
      <Body>
        <Provider createStore={() => createStore(name)}>
          <Summary />
          <Question />
        </Provider>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid #7598d6;
  border-radius: 6px;
  max-width: 862px;
  margin: auto;
  padding: 32px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 32px;
`;

const HeaderTitle = styled.h2`
  margin: 3px 0;
`;

const StyledIcon = styled.div`
  margin-right: 24px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;
