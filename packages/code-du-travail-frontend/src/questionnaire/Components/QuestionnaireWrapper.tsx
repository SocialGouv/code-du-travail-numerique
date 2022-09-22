import styled from "styled-components";
import { icons, theme } from "@socialgouv/cdtn-ui";
import { Questionnaire } from "./Questionnaire";
import { withStore, Provider } from "../store";
const { breakpoints } = theme;

const { Gear: GearIcon } = icons;

type QuestionnaireWrapperProps = {
  name: string;
  slug?: string;
  title: string;
};

export const QuestionnaireWrapper = ({
  name,
  slug,
  title,
}: QuestionnaireWrapperProps) => {
  return (
    <Wrapper>
      <Header>
        <StyledIcon>
          <GearIcon />
        </StyledIcon>
        <HeaderTitle>{title}</HeaderTitle>
      </Header>
      <Body>
        <Provider createStore={() => withStore(name)}>
          <Questionnaire slug={slug}></Questionnaire>
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
  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px;
  }
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
