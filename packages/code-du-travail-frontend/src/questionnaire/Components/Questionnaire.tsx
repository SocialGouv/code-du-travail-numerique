import styled from "styled-components";
import { icons, theme, Wrapper } from "@socialgouv/cdtn-ui";
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
  variant?: string;
};

export const Questionnaire = ({
  slug,
  title,
  personnalizedTitle,
  variant,
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
    <StyledWrapper variant={variant}>
      <Header>
        <StyledIcon>
          <GearIcon width="24" height="24" />
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
    </StyledWrapper>
  );
};

// const Wrapper = styled.div`
//   border: 1px solid #7598d6;
//   border-radius: 6px;
//   max-width: 862px;
//   margin: auto;
//   padding: 32px;
//   @media (max-width: ${breakpoints.mobile}) {
//     padding: 12px;
//   }
// `;

const StyledWrapper = styled(Wrapper)`
  padding: 32px;
  box-shadow: ${({ variant }) =>
    variant !== "dark" ? "0 1rem 2rem rgb(121 148 212 / 20%)" : "none"};
  max-width: 800px;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
`;

const HeaderTitle = styled.div`
  margin: 3px 0;
  font-weight: 600;
  font-size: 22px;
`;

const StyledIcon = styled.div`
  max-height: 35px;
  max-width: 35px;
  margin: 3px 18px 3px 12px;
  svg {
    width: 35px;
    height: 35px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;
