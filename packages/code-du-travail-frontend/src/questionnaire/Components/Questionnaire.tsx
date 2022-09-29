import styled from "styled-components";
import { icons, theme } from "@socialgouv/cdtn-ui";
import { Summary } from "./Summary";
import { Question } from "./Question";
import { useStore } from "../store";
import { PreviousResponse } from "../type";
import { useEffect, useState } from "react";
const { breakpoints } = theme;

const { Gear: GearIcon } = icons;

type QuestionnaireProps = {
  slug: string;
  title: string;
  personnalizedTitle?: string;
};

export const Questionnaire = ({
  slug,
  title,
  personnalizedTitle,
}: QuestionnaireProps) => {
  const init = useStore((state) => state.init);
  const getSlugResponses = useStore((state) => state.getSlugResponses);
  const isPersonnalizedMode = useStore((state) => state.isPersonnalizedMode);
  const toolSlug = useStore((state) => state.toolSlug);
  const previousResponses = useStore((state) => state.previousResponses);
  const [slugResponses, setSlugResponses] = useState<PreviousResponse[]>();
  init();
  useEffect(() => {
    if (slug && !isPersonnalizedMode(slug)) {
      setSlugResponses(getSlugResponses(slug));
    }
  }, [getSlugResponses, slug]);
  return (
    <Wrapper>
      <Header>
        <StyledIcon>
          <GearIcon />
        </StyledIcon>
        <HeaderTitle>
          {isPersonnalizedMode(slug) && personnalizedTitle
            ? personnalizedTitle
            : title}
        </HeaderTitle>
      </Header>
      <Body>
        <Summary
          responses={slugResponses ?? previousResponses}
          withLink={!isPersonnalizedMode(slug)}
        />
        {slug === toolSlug && <Question />}
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
