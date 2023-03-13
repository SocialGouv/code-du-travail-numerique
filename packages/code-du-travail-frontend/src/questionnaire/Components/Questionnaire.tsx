import styled from "styled-components";
import { theme } from "@socialgouv/cdtn-ui";
import { Summary } from "./Summary";
import { Question } from "./Question";
import { useStore } from "../store";
import { PreviousResponse } from "../type";
import { useEffect, useState } from "react";

type QuestionnaireProps = {
  slug: string;
  title: string;
  personnalizedTitle?: string;
  widgetMode: boolean;
};

export const Questionnaire = ({
  slug,
  title,
  personnalizedTitle,
  widgetMode,
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
    <div>
      <StyledTitle>
        {isPersonnalizedMode(slug) && personnalizedTitle
          ? personnalizedTitle
          : title}
      </StyledTitle>
      <Summary
        responses={slugResponses ?? previousResponses}
        withLink={!isPersonnalizedMode(slug)}
      />
      {slug === toolSlug && <Question widgetMode={widgetMode} />}
    </div>
  );
};

const { breakpoints } = theme;

const StyledTitle = styled.div`
  font-weight: 600;
  font-size: 22px;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 18px;
  }
`;
